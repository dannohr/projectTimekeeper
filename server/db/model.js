'use strict';

var { Bookshelf } = require('./db');

const User = Bookshelf.Model.extend(
    {   tableName: 'user',
        userstatus: function() {
            return this.belongsTo(UserStatus)},
        usersecuritygroup: function() {
            return this.belongsTo(UserSecurityGroup)},
        usergroup: function() {
            return this.belongsTo(UserGroup)},
        timesheetdata: function() {
            return this.hasMany(TimeSheetData)},
        timeentry: function() {
            return this.hasMany(TimeEntry)},
        projectuser: function() {
            return this.hasMany(ProjectUser)},
        projectnotes: function() {
            return this.hasMany(ProjectNotes)}
    });



const TimeEntry = Bookshelf.Model.extend(
    { tableName: 'timeentry',
        user: function() {
            return this.belongsTo(User);
        } 
    });

const TimeSheetData = Bookshelf.Model.extend(
    {   tableName: 'vw_timesheetdata',
        user: function() {
        return this.belongsTo(user);
    }
    });

const TotalHoursByWeek = Bookshelf.Model.extend(
    {   tableName: 'vw_totalhoursbyweek',
        user: function() {
        return this.belongsTo(user);
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
            return this.hasMany(UserPermission);
        }
    });

const UserGroup = Bookshelf.Model.extend(
    {   tableName: 'usergroup',
        user: function() {
            return this.hasMany(User)} 
        }
);

const UserPermission = Bookshelf.Model.extend(
    {   tableName: 'userpermission',
        usersecuritygroup: function() {
            return this.belongsTo(UserSecurityGroup);
        }
    });



const Project = Bookshelf.Model.extend(
    {   tableName: 'project',
        projectstatus: function() {
            return this.belongsTo(ProjectStatus)},
        projectuser: function() {
            return this.hasMany(ProjectUser)},
        projectnotes: function() {
            return this.hasMany(ProjectNotes)},
        projecttype: function() {
            return this.belongsTo(ProjectType)}
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

const ProjectUser = Bookshelf.Model.extend(
    {   tableName: 'projectuser',
        project: function() {
        return this.belongsTo(Project)},
        user: function() {
        return this.belongsTo(User)},
        projectrole: function() {
        return this.belongsTo(ProjectRole)}
    });

const ProjectRole = Bookshelf.Model.extend(
    {   tableName: 'projectrole',
        projectuser: function() {
        return this.belongsTo(ProjectUser)}
    });


const Task = Bookshelf.Model.extend(
    { tableName: 'task' }
);

const ProjectNotes = Bookshelf.Model.extend(
    { tableName: 'projectnotes',
        project: function() {
            return this.belongsTo(Project)},
        user: function() {
            return this.belongsTo(User)}
        
        }
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
            Task,
            TotalHoursByWeek,
            ProjectUser,
            ProjectRole,
            ProjectNotes,
            UserGroup
        };




