import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import appError from './../utils/appError.js';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new appError('user not found', 404)

    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new appError('ivalid email or password', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new appError('ivalid email or password', 401);

    done(null, user)

  } catch (err) {
    done(err, null)
  }
}))

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id })

    if (user) return done(null, user)

    const fullName = profile.displayName.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[1];
    const newUser = await User.create({
      googleId: profile.id,
      firstName,
      lastName,
      email: profile.emails[0].value
    })  

    done(null, newUser)

  } catch (err) {
    done(err, null)
  }
}))

export default passport;
