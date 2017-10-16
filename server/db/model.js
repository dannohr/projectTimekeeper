'use strict';

var { Bookshelf } = require('./db');

const User = Bookshelf.Model.extend(
    {   tableName: 'user',
        userstatus: function() {
            return this.belongsTo(UserStatus);
        },
        usersecuritygroup: function() {
            return this.belongsTo(UserSecurityGroup);
        } 
    });

const UserStatus = Bookshelf.Model.extend(
    {   tableName: 'userstatus',
        user: function() {
            return this.hasMany(User);
       }
    });

const UserSecurityGroup = Bookshelf.Model.extend(
    {   tableName: 'usersecuritygroup',
        user: function() {
            return this.hasMany(User);
        },
        userpermission: function() {
            return this.belongsTo(UserPermission);
        }
    });

const UserPermission = Bookshelf.Model.extend(
    {   tableName: 'userpermission',
        usersecuritygroup: function() {
            return this.hasMany(UserSecurityGroup);
        }
    });



const Project = Bookshelf.Model.extend(
    {   tableName: 'project',
        projectstatus: function() {
            return this.belongsTo(ProjectStatus)},
        projecttype: function() {
            return this.belongsTo(ProjectType);  
    }
});

const ProjectStatus = Bookshelf.Model.extend(
    {   tableName: 'projectstatus',
        project: function() {
        return this.hasMany(Project);
   }
});

const ProjectType = Bookshelf.Model.extend(
    {   tableName: 'projecttype',
        project: function() {
        return this.hasMany(Project);
    }
});



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
            UserPermission,
            UserSecurityGroup,
            Project,
            ProjectStatus,
            ProjectType,
            TimeSheetData,
            TimeEntry,
            Task
        };




