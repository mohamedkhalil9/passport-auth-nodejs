import { Router } from 'express';
import { register,  login, logout } from './../controllers/authController.js';
import { loginValidator, registerValidator } from './../validators/validators.js';
import passport from 'passport';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login',loginValidator, passport.authenticate('local'), login)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: false }), (req, res) => {
  res.redirect('http://localhost:5173')
})

router.get('/logout', logout)

export default router;
