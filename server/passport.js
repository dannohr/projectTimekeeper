// load all the things we need
const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const Auth0Strategy = require('passport-auth0');

const { domain, clientID, clientSecret } = require('../config').auth0;

// load up the user model
// var User = require('./db/model');

// load database
// const { knex } = require('./db/db');
const { knex } = require('./db/db.js');
const { User } = require('./db/model.js')

// load database
const { validPassword, generateHash } = require('./apiCtrl/apiCtrl.js');

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
                        return knex('users').where('id',res) })
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
   usernameField: 'localuser', 
   passwordField: 'password',  
   passReqToCallback: true
  }, 
  
  function(req, username, password, done) {
    console.log('Local passport authentication');
    console.log('username is ', username);
    console.log('password is ', password);
    let user ={}
    
    User
        .where({username: username})
        .fetch(({withRelated: ['userstatus','usersecuritygroup.userpermission','usergroup']}))
        .then((user, err) => {
                user = (user.toJSON() )
        
            if (!user) { //No User
                console.log('No user found')
                // return done(null, false)
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }

            if (user.userstatus_id === 2) {
                console.log('inactive user')
                // return done(null, false)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            } 
            
            if (!(validPassword(password, user.password))) {
                console.log('bad password')
                // return done(null, false, { message: 'Incorrect password.' })
                // req.flash('loginMessage', 'Oops! Wrong password.')
                return done(null, false); // create the loginMessage and save it to session as flashdata
            }
            
            
            else { //when we find the user, return it
                // console.log('FOUND USER', user.attributes);
                // return done(err, user[0]);
                return done(null, user);
            }
        })
        .catch((err) => {
            console.log('caught error')
            console.log(err)
          });
  })
);



passport.serializeUser(function(user, done) {
    // console.log('serialized user')
    done(null, user);
    });  //Adds user to the session

passport.deserializeUser(function(user, done) {
    // console.log('deserializeUser user')
    done(null, user);
    });   // Pulls user off session and un-hashes it so you can see and use it
            // will now have reg.user, use to interact with the users info




};