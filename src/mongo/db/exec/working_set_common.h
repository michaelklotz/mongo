/**
 *    Copyright (C) 2013 10gen Inc.
 *
 *    This program is free software: you can redistribute it and/or  modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#pragma once

namespace mongo {

    struct WorkingSetMember;

    class WorkingSetCommon {
    public:
        /**
         * Get an owned copy of the BSONObj the WSM refers to.
         * Requires either a valid BSONObj or valid DiskLoc.
         * Returns true if the fetch and invalidate succeeded, false otherwise.
         */
        static bool fetchAndInvalidateLoc(WorkingSetMember* member);
    };

}  // namespace mongo