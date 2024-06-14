import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as GitHubStrategy } from 'passport-github2'
import User from '../models/user.model.js'

// Falta implementar los ClientID de Google Cloud y demas
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/api/auth/google/callback'
},
async (token, tokenSecret, profile, done) => {
  try {
    const user = await User.findOrCreateByOAuth(profile)
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}
))

passport.use(new FacebookStrategy({
  clientID: 'YOUR_FACEBOOK_CLIENT_ID',
  clientSecret: 'YOUR_FACEBOOK_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/api/auth/facebook/callback'
},
async (token, tokenSecret, profile, done) => {
  try {
    const user = await User.findOrCreateByOAuth(profile)
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}
))

passport.use(new TwitterStrategy({
  consumerKey: 'YOUR_TWITTER_CONSUMER_KEY',
  consumerSecret: 'YOUR_TWITTER_CONSUMER_SECRET',
  callbackURL: 'http://localhost:3000/api/auth/twitter/callback'
},
async (token, tokenSecret, profile, done) => {
  try {
    const user = await User.findOrCreateByOAuth(profile)
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}
))

passport.use(new GitHubStrategy({
  clientID: 'YOUR_GITHUB_CLIENT_ID',
  clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/api/auth/github/callback'
},
async (token, tokenSecret, profile, done) => {
  try {
    const user = await User.findOrCreateByOAuth(profile)
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

export default passport
