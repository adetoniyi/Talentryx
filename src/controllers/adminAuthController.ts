import { Request, Response } from "express";
import Admin, { IAdmin } from "../models/Admin";
import { hashPassword, comparePassword } from "../services/authServices";
import { generateToken } from "../utils/generateToken";
import crypto from "crypto";
import { sendVerificationEmail } from "../services/emailServices"; // We'll create this next

// Admin Signup (send verification token)
export const adminSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if admin exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res
      .status(400)
      .json({ success: false, error: "Admin already exists" });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Generate verification token (random)
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Create admin doc
  const admin = new Admin({
    name,
    email,
    password: hashedPassword,
    verificationToken,
  });
  await admin.save();

  // Send verification email (async)
  await sendVerificationEmail(email, verificationToken);

  res.status(201).json({
    success: true,
    message:
      "Admin registered successfully. Please verify your email before login.",
  });
};

// Admin Verify Email
export const verifyAdminEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  const admin = await Admin.findOne({ verificationToken: token });
  if (!admin) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid or expired verification token" });
  }

  admin.isVerified = true;
  admin.verificationToken = undefined;
  await admin.save();

  res.json({
    success: true,
    message: "Email verified successfully. You can now login.",
  });
};

// Admin Login
export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = (await Admin.findOne({ email })) as
    | (IAdmin & { _id: any })
    | null;
  if (!admin) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid credentials" });
  }

  if (!admin.isVerified) {
    return res
      .status(401)
      .json({
        success: false,
        error: "Please verify your email before logging in",
      });
  }

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid credentials" });
  }

  const token = generateToken(admin._id.toString(), "admin");

  res.json({ success: true, token });
};
