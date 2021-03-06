#-- copyright
# OpenProject is an open source project management software.
# Copyright (C) 2012-2021 the OpenProject GmbH
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2013 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See COPYRIGHT and LICENSE files for more details.
#++

require 'spec_helper'

describe OpenProject::AccessControl::Permission do
  describe '#dependencies' do
    context 'for a permission with a dependency' do
      subject { OpenProject::AccessControl.permission(:edit_work_packages) }

      it 'denotes the prerequiresites' do
        expect(subject.dependencies)
          .to match_array([:view_work_packages])
      end
    end

    context 'for a permission without a dependency' do
      subject { OpenProject::AccessControl.permission(:view_work_packages) }

      it 'is empty' do
        expect(subject.dependencies)
          .to be_empty
      end
    end
  end

  describe '#global?' do
    describe 'setting global permission' do
      before { @permission = OpenProject::AccessControl::Permission.new(:perm, { cont: [:action] }, { global: true }) }

      it { expect(@permission.global?).to be_truthy }
    end

    describe 'setting non global permission' do
      before { @permission = OpenProject::AccessControl::Permission.new :perm, { cont: [:action] }, { global: false } }

      it 'is false' do
        expect(@permission.global?).to be_falsey
      end
    end

    describe 'not specifying -> default' do
      before { @permission = OpenProject::AccessControl::Permission.new :perm, { cont: [:action] }, {} }

      it 'is false' do
        expect(@permission.global?).to be_falsey
      end
    end
  end
end
