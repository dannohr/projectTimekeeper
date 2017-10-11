// Bring in our required modules
const express = require('express');
// const bodyParser = require('body-parser');
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
    saveUninitialized: true
}));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

require('./passport')(passport); // pass passport for configuration

 app.use((req, res, next) => {
    console.log('REQ BODY', req.body);
    console.log('REQ QUERY', req.query);
    console.log('REQ PARAMS', req.params);
    next();
});


// General Endpoints

app.get('/api/users', apiCtrl.getUsers)
app.post('/api/users', apiCtrl.postUser)
app.delete('/api/users', apiCtrl.deleteUser)
app.put('/api/users', apiCtrl.updateUser)
app.get('/api/userstatus', apiCtrl.getUserStatus)

app.get('/api/projects', apiCtrl.getProjects)
app.post('/api/projects', apiCtrl.postProject)
app.delete('/api/projects', apiCtrl.deleteProject)
app.put('/api/projects', apiCtrl.updateProject)
app.get('/api/projStatus', apiCtrl.getProjStatus)
app.get('/api/projType', apiCtrl.getProjType)
app.get('/api/projTask', apiCtrl.getProjTask)

app.get('/api/timesheet', apiCtrl.getWeekTimeSheet)
app.post('/api/timesheet', apiCtrl.postTimeSheetEntry)

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
    console.log('checked to see if logged in coming from index.js')
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
