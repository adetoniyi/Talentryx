"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authMiddleware_2 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Wrap async route handlers to catch errors and pass them to next()
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post("/apply/:jobId", authMiddleware_1.authenticateJWT, (0, authMiddleware_2.authorizeRoles)("user"), asyncHandler(applicationController_1.applyForJob));
router.get("/my-applications", authMiddleware_1.authenticateJWT, (0, authMiddleware_2.authorizeRoles)("user"), asyncHandler(applicationController_1.getUserApplications));
exports.default = router;
