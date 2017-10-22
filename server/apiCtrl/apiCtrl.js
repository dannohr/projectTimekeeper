
// _____  API ______ // 

const { User, UserStatus, UserGroup, UserPermission, UserSecurityGroup, Project, ProjectType, ProjectRole, ProjectStatus, ProjectUser, TimeEntry, Task, TotalHoursByWeek } = require('../db/model.js')
const { knex, Bookshelf } = require('../db/db.js');
const bcrypt   = require('bcrypt-nodejs');


const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validPassword = function(submittedPassword, hashedPassword) {
    return bcrypt.compareSync(submittedPassword, hashedPassword);
};


const getUsers = function(req, res, next) {
    if (req.query.id) {
        User.where({id: req.query.id})
            .fetch({withRelated: ['userstatus','usersecuritygroup.userpermission','usergroup']})                         
            .then(function(user) {
                console.log(user)
                res.json({ error: false, data: user.toJSON() });
            })
            .catch(function(err) {
                res.status(500).json({ error: true, data: {message: err.message}} );
            });

    } else {
        User.fetchAll({withRelated: ['userstatus','usersecuritygroup.userpermission','projectuser','usergroup']})
            .then(function (data) {
                res.json( {error: false, data: data.toJSON() });
            })
            .catch(function (err) {
            res.status(500).json( {error: true, data: {message: err.message}} );
            })
    }
}

const postUser = function(req, res, next) {
    req.body.password = generateHash(req.body.password)
    new User(req.body)
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteUser = function(req, res, next) {
    User
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};

const updateUser = function(req, res, next) {
    // Loop through object and if there's a password key, hash it:
    for (var prop in req.body) {
        if (prop == ('password')) {
            req.body.password = generateHash(req.body.password)
        }
    }
    User
        .where({id: req.query.id})
        .save(req.body
            , {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}



const getUserStatus = function(req, res, next) {
    UserStatus.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}
 

const updateUserStatus = function(req, res, next) {
    UserStatus
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const postUserStatus = function(req, res, next) {
    new UserStatus( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteUserStatus = function(req, res, next) {
    UserStatus
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};





const getUserPermission = function(req, res, next) {
    UserPermission.fetchAll({withRelated: ['usersecuritygroup']})
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const updateUserPermission = function(req, res, next) {
    UserPermission
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const getUserSecurityGroup = function(req, res, next) {
    UserSecurityGroup.fetchAll({withRelated: ['userpermission']})
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const updateUserSecurityGroup = function(req, res, next) {
    UserSecurityGroup
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const postUserSecurityGroup = function(req, res, next) {
    new UserSecurityGroup( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteUserSecurityGroup = function(req, res, next) {
    UserSecurityGroup
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};

const getProjects = function(req, res, next) {
    if (req.query.id) {
        Project
            .where({id: req.query.id})
            .fetch({withRelated: ['projectuser.user','projectstatus','projecttype','projectuser.projectrole']})                         
            .then(function(user) {
                res.json({ error: false, data: user.toJSON() });
            })
            .catch(function(err) {
                res.status(500).json({ error: true, data: {message: err.message}} );
            });
    } else
    if (req.query.status) {
        Project
            .where({projectstatusid: req.query.status})
            .fetchAll({withRelated: ['projectstatus','projecttype','projectuser.user']})                         
            .then(function(project) {
                res.json({ error: false, data: project.toJSON() });
            })
            .catch(function(err) {
                res.status(500).json({ error: true, data: {message: err.message}} );
            });
    } else {
        Project
            .fetchAll({withRelated: ['projectstatus','projecttype','projectuser']})
            .then(function (data) {
                res.json( {error: false, data: data.toJSON() });
            })
            .catch(function (err) {
            res.status(500).json( {error: true, data: {message: err.message}} );
            })
    }
}


const postProject = function(req, res, next) {
    new Project( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteProject = function(req, res, next) {
    Project
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};

const updateProject = function(req, res, next) {
    Project
        .where({id: req.query.id})
        .save( req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const getProjectStatus = function(req, res, next) {
    ProjectStatus.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const updateProjectStatus = function(req, res, next) {
    ProjectStatus
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const postProjectStatus = function(req, res, next) {
    new ProjectStatus( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteProjectStatus = function(req, res, next) {
    ProjectStatus
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};

const getProjectType = function(req, res, next) {
    ProjectType.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const updateProjectType = function(req, res, next) {
    ProjectType
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const postProjectType = function(req, res, next) {
    new ProjectType( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteProjectType = function(req, res, next) {
    ProjectType
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};

const getProjectTask = function(req, res, next) {
    Task.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const updateProjectTask = function(req, res, next) {
    Task
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const postProjectTask = function(req, res, next) {
    new Task( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteProjectTask = function(req, res, next) {
    Task
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};


const getWeekTimeSheet = function(req, res, next) {
    knex('vw_timesheetdata')
        .where({
            user_id: req.query.id,
            firstdayofweek: req.query.week
        })
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}


const getTotalHoursByWeek = function(req, res, next) {
    knex.raw('Call sp_totaltimebyuserweek();')
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}


const postTimeSheetEntry = function(req, res, next) {
    console.log('data to insert it')
    console.log(req.body)
    new TimeEntry(req.body)
        .save()
        .then(function(saved) {
          res.json({ saved });
        });
}

const deleteTimeSheetEntry = function(req, res, next) {
    TimeEntry
        .where({timeentryid: req.query.id}) 
        .destroy()
        .then(function( data) {
            res.json({ data });
        });
};


const updateTimeSheetEntry = function(req, res, next) {
    TimeEntry
        .where({timeentryid: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            console.log('done')
            res.json({ model });
            })
        .catch(function(error) {
            console.log('Error in API')
            console.log(error)
            })
}

const getTimeSheetEntry = function(req, res, next) {
    TimeEntry
        .where({timeentryid: req.query.id}) 
        .fetch({withRelated: ['user']})
        .then(function( data) {
            res.json({ data });
        })
        .catch(function (err) {
            res.status(500).json( {error: true, data: {message: err.message}} );
            })
};


const getTimeSheetEntries = function(req, res, next) {
    TimeEntry
        .forge()
        .where({user_id: req.query.id})
        .query(function(qb) {
                qb.whereBetween('taskdate', [req.query.start,req.query.end]);
            })
        .fetchAll()
        .then(function( data) {
            res.json({ data });
        })
        .catch(function (err) {
            res.status(500).json( {error: true, data: {message: err.message}} );
            })
};


const postProjectUser = function(req, res, next) {
    console.log(req.body)
    new ProjectUser( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
};

const deleteProjectUser = function(req, res, next) {
    ProjectUser
        .where({id: req.query.id}) 
        .destroy()
        .then(function( data) {
            res.json({ data });
        });
}


const getProjectRole = function(req, res, next) {
    ProjectRole.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const updateProjectRole = function(req, res, next) {
    ProjectRole
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const postProjectRole = function(req, res, next) {
    new ProjectRole( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteProjectRole = function(req, res, next) {
    ProjectRole
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};


const getProjectUser = function(req, res, next) {
    ProjectUser
    .where({user_id: req.query.id})
    .fetchAll({withRelated: ['user','project','projectrole', 'project.projectstatus', 'project.projecttype', 'project.projectnotes.user']})
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}



const updateProjectUser = function(req, res, next) {
    ProjectUser
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const getUserGroup = function(req, res, next) {
    UserGroup.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const updateUserGroup = function(req, res, next) {
    UserGroup
        .where({id: req.query.id})
        .save(req.body, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const postUserGroup = function(req, res, next) {
    new UserGroup( req.body )
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteUserGroup = function(req, res, next) {
    UserGroup
        .where({id: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};


   
module.exports = {
    validPassword,
    generateHash,

    getUsers,
    postUser,
    deleteUser,
    updateUser,
    
    getUserStatus,
    updateUserStatus,
    postUserStatus,
    deleteUserStatus,
    
    getUserSecurityGroup,
    updateUserSecurityGroup,
    postUserSecurityGroup,
    deleteUserSecurityGroup,
    
    getProjectStatus,
    updateProjectStatus,
    postProjectStatus,
    deleteProjectStatus,

    getProjectType,
    updateProjectType,
    postProjectType,
    deleteProjectType,

    getProjectTask,
    updateProjectTask,
    postProjectTask,
    deleteProjectTask,

    getProjectRole,
    updateProjectRole,
    postProjectRole,
    deleteProjectRole,

    getUserPermission,
    updateUserPermission,
    getProjects,
    postProject,
    deleteProject,
    updateProject,
    getWeekTimeSheet,
    postTimeSheetEntry,
    deleteTimeSheetEntry,
    updateTimeSheetEntry,
    getTimeSheetEntry,
    getTimeSheetEntries,
    getTotalHoursByWeek,
    postProjectUser,
    deleteProjectUser,
    updateProjectUser,
    getProjectUser,
    getUserGroup,
    updateUserGroup,
    postUserGroup,
    deleteUserGroup
}