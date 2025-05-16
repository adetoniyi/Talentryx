"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.authorizeRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "Forbidden: Access is denied." });
            return; // avoid falling through
        }
        next(); // must call next()
    };
};
exports.authorizeRoles = authorizeRoles;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateJWT = authenticateJWT;
