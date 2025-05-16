import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { hashPassword, comparePassword } from "../services/authServices";
import { generateToken } from "../utils/generateToken";

// User Signup
export const userSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, error: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = generateToken((user._id as unknown as string).toString(), "user");

  res.status(201).json({ success: true, token });
};

// User Login
export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, error: "Invalid credentials" });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, error: "Invalid credentials" });
  }

  const token = generateToken((user._id as unknown as string).toString(), "user");

  res.json({ success: true, token });
};
