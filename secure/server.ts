import * as https from 'https';
import fs from 'fs';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import cookieSession from 'cookie-session';
import { verify } from 'crypto';
import helmet from 'helmet';

import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;
const config = { 
    CLIENT_ID:  process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}
const AUTH_OPTIONS:any = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

//verify that the cookie keys are set
if (!config.COOKIE_KEY_1 || !config.COOKIE_KEY_2) {
  throw new Error('You must provide a cookie key!');
}

const app = express();
app.use(helmet());
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ], //signed by the server to prevent tampering
}));

//setup passport to use google oauth
//pass in the AUTH_OPTIONS and the callback function
passport.use(new Strategy(AUTH_OPTIONS, veryifyCallback));

// Saving the session to the cookie (google profile)
passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

// Read the session from the cookie (google profile)
passport.deserializeUser((id:string, done) => {
  done(null, id);
});

app.use(passport.initialize());

// authenticate the session uses key to validate that everything is signed, and then deserialize(using the deserailziedUser function) the user
app.use(passport.session());


app.get('/auth/google', passport.authenticate('google', { 
  scope: ['email'] 
}));

app.get('/auth/google/callback', passport.authenticate('google', { 
  failureRedirect: '/failure', 
  successRedirect: '/',
  session: true,
}), (req, res) => {
  // return res.send('You are logged in!');
  console.log("google callback");
});

app.get('/auth/logout', (req:Request, res:Response, next) => {
  // passport add the logout function to the request object
  // removes the req.user property and clears the login session (if any).
  req.logout({keepSessionInfo: false},()=>void(0));
  return res.redirect('/');
});

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});

app.get('/', (req:Request, res:Response) => {
  res.sendFile(path.join("C:\\Users\\Nick Flatow\\Documents\\code\\nasa\\secure", 'public', 'index.html'));
});


/**
 * Verifies the callback function for authentication.
 * 
 * @param accessToken - The access token.
 * @param refreshToken - The refresh token.
 * @param profile - The user profile.
 * @param done - The callback function to indicate completion.
 * @returns The user profile.
 */
function veryifyCallback(accessToken: any, refreshToken: any, profile: any, done: any) {
  // optional do some internal work here with the user profile, accessToken, refreshToken like save it to a database

  // console.log('Access token: ', accessToken);
  // console.log('Refresh token: ', refreshToken);
  // console.log('Profile: ', profile);
  return done(null, profile);
}

function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
  //passport deserializes the user and attaches it to the request object as req.user
  // console.log(req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }
  next();
}

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});