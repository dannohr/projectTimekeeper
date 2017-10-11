// load all the things we need
const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const Auth0Strategy = require('passport-auth0');

const { domain, clientID, clientSecret } = require('../config').auth0;

// load up the user model
var User = require('./db/model');

// load database
const { knex } = require('./db/db');

// expose this function to our app using module.exports
module.exports = function(passport) {   
    
    passport.use(new Auth0Strategy({domain, clientID, clientSecret, callbackURL:  '/auth0/callback'}, 
        (accessToken, refreshToken, extraParams, profile, done) => {
            knex('user').where('authid', profile._json.sub)
            .then((user, err) => {
                if (!user[0]) { //if there isn't a user, we'll create one!
                    console.log('CREATING USER');
                    knex('user').insert({username: profile.nickname, authid: profile._json.sub})
                    .then((res) => {
                        return knex('users').where('userid',res) })
                        .then((res, err) => {
                            console.log('USER CREATED', res[0]);
                            return done(err, res[0]); // GOES TO SERIALIZE USER
                    })
                } else { //when we find the user, return it
                    console.log('FOUND USER', user[0]);
                    return done(err, user[0]);
                }
            });
        }   
    ) 
    );   // last line of auth0 stuff

  
passport.use('login', new LocalStrategy( {
   usernameField: 'localuser', // redundant, could override
   passwordField: 'password', // same here
   passReqToCallback: true
  }, 
  // note first parameter is request object, because passReqToCallback=true
  function(req, username, password, done) {
    console.log('Local passport authentication');
    console.log('username is ', username);
    console.log('password is ', password);
    
    knex('user').where('username', username)
    .then((user, err) => {
        console.log('password from db: ',user.password)
        console.log('password from form: ',password)
        if (!user[0]) { //No User
            console.log('No user found')
            return done(null, false)
            // return done(null, false, req.flash('loginMessage', 'No user found.'));
          
        } 
        
        if (!(user[0].password == password)) {
            console.log('bas password')
            return done(null, false)
            // return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        }
        
        
        else { //when we find the user, return it
            console.log('FOUND USER', user[0]);
            // return done(err, user[0]);
            return done(null, user[0]);
        }
    });
  })
);



passport.serializeUser(function(user, done) {
    console.log('serialized user')
    done(null, user);
    });  //Adds user to the session

passport.deserializeUser(function(user, done) {
    console.log('deserializeUser user')
    done(null, user);
    });   // Pulls user off session and un-hashes it so you can see and use it
            // will now have reg.user, use to interact with the users info




};