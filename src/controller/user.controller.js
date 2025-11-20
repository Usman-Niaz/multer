import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user.mdel.js";
import {
  badRequest,
  unauthenticated,
  notFound,
} from "../utils/customeError.util.js";
dotenv.config();

export const registeration = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(res.body)
  if (!name || !email || !password) {
    throw new badRequest("Name,Email and Password are require");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new badRequest("User already exists with this email");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({
    success: true,
    token,
    message: "User registered successfully",
    newUser: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new badRequest("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new notFound("User with this email does not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new unauthenticated("Incorrect password");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    success: true,
    token,
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email,
    },
  });
};
