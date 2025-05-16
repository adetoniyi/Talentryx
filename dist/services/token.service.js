"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminVerificationToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
exports.generateJwtToken = generateJwtToken;
const generateAdminVerificationToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.JWT_ADMIN_VERIFICATION_SECRET, { expiresIn: "1d" });
};
exports.generateAdminVerificationToken = generateAdminVerificationToken;
