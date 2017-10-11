'use strict';

var { Bookshelf } = require('./db');

const User = Bookshelf.Model.extend(
    {   tableName: 'user',
        userstatus: function() {
            return this.belongsTo(UserStatus);
        } 
    });

const UserStatus = Bookshelf.Model.extend(
    {   tableName: 'userstatus',
        user: function() {
            return this.hasMany(User);
       }
    });

const Project = Bookshelf.Model.extend(
    { tableName: 'project' }
);

const ProjectStatus = Bookshelf.Model.extend(
    { tableName: 'projectstatus' }
);

const ProjectType = Bookshelf.Model.extend(
    { tableName: 'projecttype' }
);

const TimeSheetData = Bookshelf.Model.extend(
    { tableName: 'vw_timesheetdata' }
);

const TimeEntry = Bookshelf.Model.extend(
    { tableName: 'timeentry' }
);

const Task = Bookshelf.Model.extend(
    { tableName: 'task' }
);



 module.exports = {
            User,
            UserStatus,
            Project,
            ProjectStatus,
            ProjectType,
            TimeSheetData,
            TimeEntry,
            Task
        };




