"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyAdminToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(403).json({ message: "Token is missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.verifiedAdmin = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.verifyAdminToken = verifyAdminToken;
