// config/passport.js
// Passport setup for Google + GitHub login.
// I'm reusing the same User model and just attaching googleId / githubId.

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const User = require('../app/models/user.server.model'); // adjust path if needed

// Store just the user id in the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Get full user document back from id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// --- Google strategy ---
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find existing user by googleId
        let user = await User.findOne({ googleId: profile.id }).exec();

        if (!user) {
          // If not found, create a new user document
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email:
              (profile.emails && profile.emails[0] && profile.emails[0].value) ||
              undefined,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// --- GitHub strategy ---
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id }).exec();

        if (!user) {
          const email =
            (profile.emails && profile.emails[0] && profile.emails[0].value) ||
            undefined;

          user = await User.create({
            githubId: profile.id,
            displayName: profile.displayName || profile.username,
            email,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
