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

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new appError('ivalid email or password', 401);

    done(null, user)

  } catch (err) {
    done(err, null)
  }
}))

//passport.use(new GoogleStrategy({
//  clientID: process.env.clientID,
//  clientSecret: process.env.clientSecret,
//  callbackURL: '/auth/google/callback'
//}, async (accessToken, refreshToken, profile, done) => {
//  try {
//    const user = await User.findOne({ googleId: profile.id })
//
//    if (user) {
//      return done(null, user)
//    }
//
//    const newUser = await User.create({
//      googleId: profile.id,
//      name: profile.displayName,
//      email: profile.emails[0].value
//    })  
//
//    done(null, newUser)
//  } catch (error) {
//    done(error)
//  }
//}))

export default passport;
