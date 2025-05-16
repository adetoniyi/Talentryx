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
exports.adminLogin = exports.adminVerifyEmail = exports.adminRegister = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_service_1 = require("../../services/token.service");
const sendEmail_1 = require("../../utils/sendEmail");
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = yield Admin_1.default.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const admin = yield Admin_1.default.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
        });
        const token = (0, token_service_1.generateAdminVerificationToken)(email);
        const verificationLink = `${process.env.FRONTEND_URL}/admin/verify?token=${token}`;
        const message = `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `;
        yield (0, sendEmail_1.sendEmail)(email, "Verify your Admin Account", message);
        res.status(201).json({
            message: "Admin registered. Verification email sent.",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.adminRegister = adminRegister;
const adminVerifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ADMIN_VERIFICATION_SECRET);
        const admin = yield Admin_1.default.findOne({ email: decoded.email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        admin.isVerified = true;
        yield admin.save();
        res.status(200).json({ message: "Email verified. You can now log in." });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});
exports.adminVerifyEmail = adminVerifyEmail;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield Admin_1.default.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (!admin.isVerified) {
            return res.status(401).json({ message: "Please verify your email first" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.adminLogin = adminLogin;
