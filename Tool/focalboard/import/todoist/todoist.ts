// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable @typescript-eslint/no-empty-interface */
// Generated by https://quicktype.io

export interface Todoist {
    collaborator_states:             any[];
    collaborators:                   any[];
    day_orders:                      DayOrders;
    day_orders_timestamp:            string;
    due_exceptions:                  any[];
    filters:                         Filter[];
    full_sync:                       boolean;
    incomplete_item_ids:             any[];
    incomplete_project_ids:          any[];
    items:                           Item[];
    labels:                          any[];
    live_notifications:              any[];
    live_notifications_last_read_id: number;
    locations:                       any[];
    notes:                           Note[];
    project_notes:                   any[];
    projects:                        Project[];
    reminders:                       any[];
    sections:                        Section[];
    stats:                           Stats;
    sync_token:                      string;
    temp_id_mapping:                 DayOrders;
    tooltips:                        Tooltips;
    user:                            User;
    user_plan_limits:                UserPlanLimits;
    user_settings:                   UserSettings;
    view_options:                    any[];
}

export interface DayOrders {
}

export interface Filter {
    color:       number;
    id:          number;
    is_deleted:  number;
    is_favorite: number;
    item_order:  number;
    name:        string;
    query:       string;
}

export interface Item {
    added_by_uid:    number;
    assigned_by_uid: null;
    checked:         number;
    child_order:     number;
    collapsed:       number;
    content:         string;
    date_added:      Date;
    date_completed:  null;
    day_order:       number;
    due:             Due | null;
    has_more_notes:  boolean;
    id:              number;
    in_history:      number;
    is_deleted:      number;
    labels:          any[];
    parent_id:       number | null;
    priority:        number;
    project_id:      number;
    responsible_uid: null;
    section_id:      number;
    sync_id:         null;
    user_id:         number;
}

export interface Due {
    date:         Date;
    is_recurring: boolean;
    lang:         string;
    string:       string;
    timezone:     null;
}

export interface Note {
    content:         string;
    file_attachment: FileAttachment | null;
    id:              number;
    is_deleted:      number;
    item_id:         number;
    posted:          Date;
    posted_uid:      number;
    project_id:      number;
    reactions:       null;
    uids_to_notify:  null;
}

export interface FileAttachment {
    description:   string;
    favicon:       string;
    image:         string;
    image_height:  number;
    image_width:   number;
    resource_type: string;
    site_name:     string;
    title:         string;
    url:           string;
}

export interface Project {
    child_order:    number;
    collapsed:      number;
    color:          number;
    has_more_notes: boolean;
    id:             number;
    inbox_project?: boolean;
    is_archived:    number;
    is_deleted:     number;
    is_favorite:    number;
    name:           string;
    parent_id:      null;
    shared:         boolean;
    sync_id:        null;
}

export interface Section {
    collapsed:     boolean;
    date_added:    Date;
    date_archived: null;
    id:            number | string;
    is_archived:   boolean;
    is_deleted:    boolean;
    name:          string;
    project_id:    number;
    section_order: number;
    sync_id:       null;
    user_id:       number;
}

export interface Stats {
    completed_count: number;
    days_items:      DaysItem[];
    week_items:      WeekItem[];
}

export interface DaysItem {
    date:            Date;
    total_completed: number;
}

export interface WeekItem {
    from:            Date;
    to:              Date;
    total_completed: number;
}

export interface Tooltips {
    scheduled: string[];
    seen:      string[];
}

export interface User {
    auto_reminder:           number;
    business_account_id:     null;
    daily_goal:              number;
    date_format:             number;
    dateist_inline_disabled: boolean;
    dateist_lang:            null;
    days_off:                number[];
    default_reminder:        string;
    email:                   string;
    features:                Features;
    full_name:               string;
    id:                      number;
    image_id:                null;
    inbox_project:           number;
    is_biz_admin:            boolean;
    is_premium:              boolean;
    join_date:               Date;
    karma:                   number;
    karma_trend:             string;
    lang:                    string;
    mobile_host:             null;
    mobile_number:           null;
    next_week:               number;
    premium_until:           null;
    share_limit:             number;
    sort_order:              number;
    start_day:               number;
    start_page:              string;
    theme:                   number;
    time_format:             number;
    tz_info:                 TzInfo;
    unique_prefix:           number;
    websocket_url:           string;
    weekly_goal:             number;
}

export interface Features {
    beta:                    number;
    dateist_inline_disabled: boolean;
    dateist_lang:            null;
    has_push_reminders:      boolean;
    karma_disabled:          boolean;
    karma_vacation:          boolean;
    restriction:             number;
}

export interface TzInfo {
    gmt_string: string;
    hours:      number;
    is_dst:     number;
    minutes:    number;
    timezone:   string;
}

export interface UserPlanLimits {
    current: Current;
    next:    Current;
}

export interface Current {
    activity_log:           boolean;
    activity_log_limit:     number;
    automatic_backups:      boolean;
    calendar_feeds:         boolean;
    comments:               boolean;
    completed_tasks:        boolean;
    customization_color:    boolean;
    email_forwarding:       boolean;
    filters:                boolean;
    labels:                 boolean;
    max_collaborators:      number;
    max_filters:            number;
    max_labels:             number;
    max_projects:           number;
    max_reminders_location: number;
    max_reminders_time:     number;
    max_sections:           number;
    max_tasks:              number;
    plan_name:              string;
    reminders:              boolean;
    templates:              boolean;
    upload_limit_mb:        number;
    uploads:                boolean;
    weekly_trends:          boolean;
}

export interface UserSettings {
    completed_sound_desktop: boolean;
    completed_sound_mobile:  boolean;
    legacy_pricing:          boolean;
    reminder_desktop:        boolean;
    reminder_email:          boolean;
    reminder_push:           boolean;
    sound_on_completed:      boolean;
}
