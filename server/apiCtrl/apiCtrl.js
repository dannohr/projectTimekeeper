
// _____  API ______ // 

const { User, UserStatus, Project, ProjectType, ProjectStatus, TimeEntry, Task } = require('../db/model.js')
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
        User.where({userid: req.query.id})
            .fetch(({withRelated: ['userstatus']}))                         
            .then(function(user) {
                console.log(user)
                res.json({ error: false, data: user.toJSON() });
            })
            .catch(function(err) {
                res.status(500).json({ error: true, data: {message: err.message}} );
            });

    } else {
        User.fetchAll(({withRelated: ['userstatus']}))
            .then(function (data) {
                res.json( {error: false, data: data.toJSON() });
            })
            .catch(function (err) {
            res.status(500).json( {error: true, data: {message: err.message}} );
            })
    }
}

const postUser = function(req, res, next) {
    new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      userstatus_id: req.body.userstatus_id,
      password: generateHash(req.body.password)
    })
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteUser = function(req, res, next) {
    User
        .where({userid: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};

const updateUser = function(req, res, next) {
    User
        .where({userid: req.query.id})
        .save({firstname: req.body.firstname,
               lastname: req.body.lastname,
               email: req.body.email,
               username: req.body.username,
               userstatus_id: req.body.userstatus_id,
               password: generateHash(req.body.password)
            }, {patch:true}) 
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


const getProjects = function(req, res, next) {
    if (req.query.id) {
        Project
            .where({projectid: req.query.id})
            .fetch()                         
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
            .fetchAll(({withRelated: ['projectstatus','projecttype']}))                         
            .then(function(project) {
                res.json({ error: false, data: project.toJSON() });
            })
            .catch(function(err) {
                res.status(500).json({ error: true, data: {message: err.message}} );
            });
    } else {
        Project.fetchAll(({withRelated: ['projectstatus','projecttype']}))
            .then(function (data) {
                res.json( {error: false, data: data.toJSON() });
            })
            .catch(function (err) {
            res.status(500).json( {error: true, data: {message: err.message}} );
            })
    }
}


const postProject = function(req, res, next) {
    new Project({
      projectname: req.body.projectname,
      projectstatusid: req.body.projectstatusid,
      projecttypeid: req.body.projecttypeid,
    })
      .save()
      .then(function(saved) {
        res.json({ saved });
      });
  };

const deleteProject = function(req, res, next) {
    Project
        .where({projectid: req.query.id}) 
        .destroy()
        .then(function(model) {
            res.json({ model });
        });
};

const updateProject = function(req, res, next) {
    Project
        .where({projectid: req.query.id})
        .save({
            projectname: req.body.projectname,
            projectstatusid: req.body.projectstatusid,
            projecttypeid: req.body.projecttypeid
            }, {patch:true}) 
        .then(function(model) {
            res.json({ model });
        });
}

const getProjStatus = function(req, res, next) {
    ProjectStatus.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const getProjType = function(req, res, next) {
    ProjectType.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}

const getProjTask = function(req, res, next) {
    Task.fetchAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}


const getWeekTimeSheet = function(req, res, next) {
    
    knex('vw_timesheetdata')
        .where({
            userid: req.query.id,
            firstdayofweek: req.query.week
        })
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
    res.status(500).json( {error: true, data: {message: err.message}} );
    })
}


const postTimeSheetEntry = function(req, res, next) {
    new TimeEntry({
        userid: req.body.userid,
        projectid: req.body.projectid,
        taskid: req.body.taskid,
        taskhours: req.body.taskhours,
        taskdate: req.body.taskdate
      })
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
        .save({
            userid: req.body.userid,
            projectid: req.body.projectid,
            taskid: req.body.taskid,
            taskhours: req.body.taskhours,
            taskdate: req.body.taskdate
            }, {patch:true}) 
        .then(function(model) {
            console.log('done')
            res.json({ model });
        });
}

const getTimeSheetEntry = function(req, res, next) {
    TimeEntry
        .where({timeentryid: req.query.id}) 
        .fetch()
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
        .where({userid: req.query.id})
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




   
module.exports = {
    validPassword,
    generateHash, 
    getUsers,
    postUser,
    deleteUser,
    updateUser,
    getUserStatus,
    getProjects,
    postProject,
    deleteProject,
    updateProject,
    getProjStatus,
    getProjType,
    getProjTask,
    getWeekTimeSheet,
    postTimeSheetEntry,
    deleteTimeSheetEntry,
    updateTimeSheetEntry,
    getTimeSheetEntry,
    getTimeSheetEntries
}