import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: 'User registered successfully',
    user,
  });
};
