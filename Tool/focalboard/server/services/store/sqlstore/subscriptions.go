// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

package sqlstore

import (
	"database/sql"

	sq "github.com/Masterminds/squirrel"
	"github.com/mattermost/focalboard/server/model"
	"github.com/mattermost/focalboard/server/services/store"

	"github.com/mattermost/mattermost-server/v6/shared/mlog"
)

var subscriptionFields = []string{
	"block_type",
	"block_id",
	"workspace_id",
	"subscriber_type",
	"subscriber_id",
	"notified_at",
	"create_at",
	"delete_at",
}

func valuesForSubscription(sub *model.Subscription) []interface{} {
	return []interface{}{
		sub.BlockType,
		sub.BlockID,
		sub.WorkspaceID,
		sub.SubscriberType,
		sub.SubscriberID,
		sub.NotifiedAt,
		sub.CreateAt,
		sub.DeleteAt,
	}
}

func (s *SQLStore) subscriptionsFromRows(rows *sql.Rows) ([]*model.Subscription, error) {
	subscriptions := []*model.Subscription{}

	for rows.Next() {
		var sub model.Subscription
		err := rows.Scan(
			&sub.BlockType,
			&sub.BlockID,
			&sub.WorkspaceID,
			&sub.SubscriberType,
			&sub.SubscriberID,
			&sub.NotifiedAt,
			&sub.CreateAt,
			&sub.DeleteAt,
		)
		if err != nil {
			return nil, err
		}
		subscriptions = append(subscriptions, &sub)
	}
	return subscriptions, nil
}

// createSubscription creates a new subscription, or returns an existing subscription
// for the block & subscriber.
func (s *SQLStore) createSubscription(db sq.BaseRunner, c store.Container, sub *model.Subscription) (*model.Subscription, error) {
	sub.WorkspaceID = c.WorkspaceID

	if err := sub.IsValid(); err != nil {
		return nil, err
	}

	now := model.GetMillis()

	subAdd := *sub
	subAdd.NotifiedAt = now // notified_at set so first notification doesn't pick up all history
	subAdd.CreateAt = now
	subAdd.DeleteAt = 0

	query := s.getQueryBuilder(db).
		Insert(s.tablePrefix + "subscriptions").
		Columns(subscriptionFields...).
		Values(valuesForSubscription(&subAdd)...)

	if s.dbType == mysqlDBType {
		query = query.Suffix("ON DUPLICATE KEY UPDATE delete_at = 0, notified_at = ?", now)
	} else {
		query = query.Suffix("ON CONFLICT (block_id,subscriber_id) DO UPDATE SET delete_at = 0, notified_at = ?", now)
	}

	if _, err := query.Exec(); err != nil {
		s.logger.Error("Cannot create subscription",
			mlog.String("block_id", sub.BlockID),
			mlog.String("workspace_id", sub.WorkspaceID),
			mlog.String("subscriber_id", sub.SubscriberID),
			mlog.Err(err),
		)
		return nil, err
	}
	return &subAdd, nil
}

// deleteSubscription soft deletes the subscription for a specific block and subscriber.
func (s *SQLStore) deleteSubscription(db sq.BaseRunner, c store.Container, blockID string, subscriberID string) error {
	now := model.GetMillis()

	query := s.getQueryBuilder(db).
		Update(s.tablePrefix+"subscriptions").
		Set("delete_at", now).
		Where(sq.Eq{"block_id": blockID}).
		Where(sq.Eq{"workspace_id": c.WorkspaceID}).
		Where(sq.Eq{"subscriber_id": subscriberID})

	result, err := query.Exec()
	if err != nil {
		return err
	}

	count, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if count == 0 {
		return store.NewErrNotFound(c.WorkspaceID + "," + blockID + "," + subscriberID)
	}

	return nil
}

// getSubscription fetches the subscription for a specific block and subscriber.
func (s *SQLStore) getSubscription(db sq.BaseRunner, c store.Container, blockID string, subscriberID string) (*model.Subscription, error) {
	query := s.getQueryBuilder(db).
		Select(subscriptionFields...).
		From(s.tablePrefix + "subscriptions").
		Where(sq.Eq{"block_id": blockID}).
		Where(sq.Eq{"workspace_id": c.WorkspaceID}).
		Where(sq.Eq{"subscriber_id": subscriberID}).
		Where(sq.Eq{"delete_at": 0})

	rows, err := query.Query()
	if err != nil {
		s.logger.Error("Cannot fetch subscription for block & subscriber",
			mlog.String("block_id", blockID),
			mlog.String("workspace_id", c.WorkspaceID),
			mlog.String("subscriber_id", subscriberID),
			mlog.Err(err),
		)
		return nil, err
	}
	defer s.CloseRows(rows)

	subscriptions, err := s.subscriptionsFromRows(rows)
	if err != nil {
		s.logger.Error("Cannot get subscription for block & subscriber",
			mlog.String("block_id", blockID),
			mlog.String("workspace_id", c.WorkspaceID),
			mlog.String("subscriber_id", subscriberID),
			mlog.Err(err),
		)
		return nil, err
	}
	if len(subscriptions) == 0 {
		return nil, store.NewErrNotFound(c.WorkspaceID + "," + blockID + "," + subscriberID)
	}
	return subscriptions[0], nil
}

// getSubscriptions fetches all subscriptions for a specific subscriber.
func (s *SQLStore) getSubscriptions(db sq.BaseRunner, c store.Container, subscriberID string) ([]*model.Subscription, error) {
	query := s.getQueryBuilder(db).
		Select(subscriptionFields...).
		From(s.tablePrefix + "subscriptions").
		Where(sq.Eq{"subscriber_id": subscriberID}).
		Where(sq.Eq{"workspace_id": c.WorkspaceID}).
		Where(sq.Eq{"delete_at": 0})

	rows, err := query.Query()
	if err != nil {
		s.logger.Error("Cannot fetch subscriptions for subscriber",
			mlog.String("subscriber_id", subscriberID),
			mlog.Err(err),
		)
		return nil, err
	}
	defer s.CloseRows(rows)

	return s.subscriptionsFromRows(rows)
}

// getSubscribersForBlock fetches all subscribers for a block.
func (s *SQLStore) getSubscribersForBlock(db sq.BaseRunner, c store.Container, blockID string) ([]*model.Subscriber, error) {
	query := s.getQueryBuilder(db).
		Select(
			"subscriber_type",
			"subscriber_id",
			"notified_at",
		).
		From(s.tablePrefix + "subscriptions").
		Where(sq.Eq{"block_id": blockID}).
		Where(sq.Eq{"workspace_id": c.WorkspaceID}).
		Where(sq.Eq{"delete_at": 0}).
		OrderBy("notified_at")

	rows, err := query.Query()
	if err != nil {
		s.logger.Error("Cannot fetch subscribers for block",
			mlog.String("block_id", blockID),
			mlog.String("workspace_id", c.WorkspaceID),
			mlog.Err(err),
		)
		return nil, err
	}
	defer s.CloseRows(rows)

	subscribers := []*model.Subscriber{}

	for rows.Next() {
		var sub model.Subscriber
		err := rows.Scan(
			&sub.SubscriberType,
			&sub.SubscriberID,
			&sub.NotifiedAt,
		)
		if err != nil {
			return nil, err
		}
		subscribers = append(subscribers, &sub)
	}
	return subscribers, nil
}

// getSubscribersCountForBlock returns a count of all subscribers for a block.
func (s *SQLStore) getSubscribersCountForBlock(db sq.BaseRunner, c store.Container, blockID string) (int, error) {
	query := s.getQueryBuilder(db).
		Select("count(subscriber_id)").
		From(s.tablePrefix + "subscriptions").
		Where(sq.Eq{"block_id": blockID}).
		Where(sq.Eq{"workspace_id": c.WorkspaceID}).
		Where(sq.Eq{"delete_at": 0})

	row := query.QueryRow()

	var count int
	err := row.Scan(&count)
	if err != nil {
		s.logger.Error("Cannot count subscribers for block",
			mlog.String("block_id", blockID),
			mlog.String("workspace_id", c.WorkspaceID),
			mlog.Err(err),
		)
		return 0, err
	}
	return count, nil
}

// updateSubscribersNotifiedAt updates the notified_at field of all subscribers for a block.
func (s *SQLStore) updateSubscribersNotifiedAt(db sq.BaseRunner, c store.Container, blockID string, notifiedAt int64) error {
	query := s.getQueryBuilder(db).
		Update(s.tablePrefix+"subscriptions").
		Set("notified_at", notifiedAt).
		Where(sq.Eq{"block_id": blockID}).
		Where(sq.Eq{"workspace_id": c.WorkspaceID}).
		Where(sq.Eq{"delete_at": 0})

	if _, err := query.Exec(); err != nil {
		s.logger.Error("UpdateSubscribersNotifiedAt error occurred while updating subscriber(s)",
			mlog.String("blockID", blockID),
			mlog.Err(err),
		)
		return err
	}
	return nil
}
