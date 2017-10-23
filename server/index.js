// Bring in our required modules
const express = require('express');;
const { json } = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const authType = 'Auth0';
const moment = require('moment');

console.log('Current Time is: ',moment().format('MMMM Do YYYY, h:mm'));

const { port } = require('../config').port;
const { secret } = require('../config').session;

const apiCtrl = require('./apiCtrl/apiCtrl.js')

const flash = require("connect-flash");

const router = express.Router();
const reports = require('./routes/reports.js')

// App Declaration
const app = express();
app.use('/api', router);

// required middlewares
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../public`));


// setting up express sessions
// secret: config.session.secret;
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true //,
    //cookie: { secure: true }
}));

app.use(flash());
// app.configure(function() {
//     app.use(express.cookieParser('keyboard cat'));
//     app.use(express.session({ cookie: { maxAge: 60000 }}));
//     app.use(flash());
//   });

app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});


// setting up passport
app.use(passport.initialize());
app.use(passport.session());


require('./passport')(passport); // pass passport for configuration

//  app.use((req, res, next) => {
//     console.log('REQ BODY', req.body);
//     console.log('REQ QUERY', req.query);
//     console.log('REQ PARAMS', req.params);
//     next();
// });


// Report Server Endpoints
app.use('/api/reportserver/invoice', reports.invoiceReport)

app.get('/api/reports/totalhours', apiCtrl.getTotalHoursByWeek)
app.get('/api/reports/invoicedata', apiCtrl.getInvoiceData)

// General Endpoints
app.get('/api/users', apiCtrl.getUsers)
app.post('/api/users', apiCtrl.postUser)
app.delete('/api/users', apiCtrl.deleteUser)
app.put('/api/users', apiCtrl.updateUser)

app.get('/api/usergroup', apiCtrl.getUserGroup)
app.post('/api/usergroup', apiCtrl.postUserGroup)
app.delete('/api/usergroup', apiCtrl.deleteUserGroup)
app.put('/api/usergroup', apiCtrl.updateUserGroup)

app.get('/api/userstatus', apiCtrl.getUserStatus)
app.put('/api/userstatus', apiCtrl.updateUserStatus)
app.post('/api/userstatus', apiCtrl.postUserStatus)
app.delete('/api/userstatus', apiCtrl.deleteUserStatus)


app.get('/api/userpermission', apiCtrl.getUserPermission)
app.put('/api/userpermission', apiCtrl.updateUserPermission)

app.get('/api/usersecuritygroup', apiCtrl.getUserSecurityGroup)
app.put('/api/usersecuritygroup', apiCtrl.updateUserSecurityGroup)
app.post('/api/usersecuritygroup', apiCtrl.postUserSecurityGroup)
app.delete('/api/usersecuritygroup', apiCtrl.deleteUserSecurityGroup)

app.get('/api/projects', apiCtrl.getProjects)
app.post('/api/projects', apiCtrl.postProject)
app.delete('/api/projects', apiCtrl.deleteProject)
app.put('/api/projects', apiCtrl.updateProject)

app.get('/api/projectstatus', apiCtrl.getProjectStatus)
app.put('/api/projectstatus', apiCtrl.updateProjectStatus)
app.post('/api/projectstatus', apiCtrl.postProjectStatus)
app.delete('/api/projectstatus', apiCtrl.deleteProjectStatus)


app.get('/api/projecttype', apiCtrl.getProjectType)
app.put('/api/projecttype', apiCtrl.updateProjectType)
app.post('/api/projecttype', apiCtrl.postProjectType)
app.delete('/api/projecttype', apiCtrl.deleteProjectType)

app.get('/api/projecttask', apiCtrl.getProjectTask)
app.put('/api/projecttask', apiCtrl.updateProjectTask)
app.post('/api/projecttask', apiCtrl.postProjectTask)
app.delete('/api/projecttask', apiCtrl.deleteProjectTask)

app.get('/api/projectuser', apiCtrl.getProjectUser)
app.post('/api/projectuser', apiCtrl.postProjectUser)
app.delete('/api/projectuser', apiCtrl.deleteProjectUser)
app.put('/api/projectuser', apiCtrl.updateProjectUser)

app.get('/api/projectrole', apiCtrl.getProjectRole)
app.post('/api/projectrole', apiCtrl.postProjectRole)
app.delete('/api/projectrole', apiCtrl.deleteProjectRole)
app.put('/api/projectrole', apiCtrl.updateProjectRole)


app.get('/api/timesheet', apiCtrl.getWeekTimeSheet)
app.post('/api/timeentry', apiCtrl.postTimeSheetEntry)
app.delete('/api/timeentry', apiCtrl.deleteTimeSheetEntry)
app.put('/api/timeentry', apiCtrl.updateTimeSheetEntry)
app.get('/api/timeentry', apiCtrl.getTimeSheetEntry)
app.get('/api/timeentries', apiCtrl.getTimeSheetEntries)   //get all betwwen two dates by user_id

// auth endpoints

// initial endpoint to fire off login screen
app.get('/auth0', passport.authenticate('auth0', {scope: 'openid profile'}));

// redirect to home and use the resolve to catch the user
app.get('/auth0/callback',
    passport.authenticate('auth0', { successRedirect: '/' }), (req, res) => {
        res.status(200).json(req.user);
});

app.post('/login',
passport.authenticate('login', { successRedirect: '/' }), (req, res) => {
    res.status(200).json(req.user);
    
});


// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    // console.log('checked to see if logged in coming from index.js')
    if (!req.user) return res.status(401).json({err: 'User Not Authenticated'});
    
    res.status(200).json(req.user);
});

// remove user from session
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// listen on port
app.listen(port, ()=> {
    console.log(`LISTENING ON PORT: ${port}`);
});
