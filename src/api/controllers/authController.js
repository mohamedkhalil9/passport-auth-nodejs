import User from './../models/userModel.js';
import asyncWrapper from './../middlewares/asyncWrapper.js';
import appError from './../utils/appError.js';
import bcrypt from 'bcrypt';

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const user = await User.findOne({ email: email });
  if (user) throw new appError("user aleardy existed", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ firstName, lastName, email, password: hashedPassword, role });

  res.status(201).json({ status: "success", data: newUser });
})

const login = asyncWrapper(async (req, res) => { 
  const { user } = req;
  req.login(user, (err) => {
    if (err) throw new appError(err.message , 500)

    res.status(200).json({ id: user._id,  email: user.email })
  })
})

const logout = asyncWrapper(async (req, res) => {
  req.logout((err) => {
    if (err) throw new appError(err.message, 500);

    res.sendStatus(204)
  })
})

export { register, login, logout }
