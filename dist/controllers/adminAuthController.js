"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.verifyAdminEmail = exports.adminSignup = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
const authServices_1 = require("../services/authServices");
const generateToken_1 = require("../utils/generateToken");
const crypto_1 = __importDefault(require("crypto"));
const emailServices_1 = require("../services/emailServices"); // We'll create this next
// Admin Signup (send verification token)
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Check if admin exists
    const existingAdmin = yield Admin_1.default.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ success: false, error: "Admin already exists" });
    }
    // Hash password
    const hashedPassword = yield (0, authServices_1.hashPassword)(password);
    // Generate verification token (random)
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    // Create admin doc
    const admin = new Admin_1.default({
        name,
        email,
        password: hashedPassword,
        verificationToken,
    });
    yield admin.save();
    // Send verification email (async)
    yield (0, emailServices_1.sendVerificationEmail)(email, verificationToken);
    res.status(201).json({
        success: true,
        message: "Admin registered successfully. Please verify your email before login.",
    });
});
exports.adminSignup = adminSignup;
// Admin Verify Email
const verifyAdminEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const admin = yield Admin_1.default.findOne({ verificationToken: token });
    if (!admin) {
        return res.status(400).json({ success: false, error: "Invalid or expired verification token" });
    }
    admin.isVerified = true;
    admin.verificationToken = undefined;
    yield admin.save();
    res.json({ success: true, message: "Email verified successfully. You can now login." });
});
exports.verifyAdminEmail = verifyAdminEmail;
// Admin Login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const admin = yield Admin_1.default.findOne({ email });
    if (!admin) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
    }
    if (!admin.isVerified) {
        return res.status(401).json({ success: false, error: "Please verify your email before logging in" });
    }
    const isMatch = yield (0, authServices_1.comparePassword)(password, admin.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
    }
    const token = (0, generateToken_1.generateToken)(admin._id.toString(), "admin");
    res.json({ success: true, token });
});
exports.adminLogin = adminLogin;
