"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const profile_controller_1 = require("../controllers/profile.controller");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
/**
 * Utility to wrap async route handlers and forward errors to Express error handler.
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management endpoints
 */
/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Create or update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               experience:
 *                 type: string
 *               skills:
 *                 type: string
 *                 description: Comma-separated values
 *               resume:
 *                 type: string
 *                 format: binary
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile created or updated successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", asyncHandler(authMiddleware_1.authenticateJWT), upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
]), asyncHandler(profile_controller_1.createOrUpdateProfile));
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *       404:
 *         description: Profile not found
 */
router.get("/", asyncHandler(authMiddleware_1.authenticateJWT), asyncHandler(profile_controller_1.getUserProfile));
exports.default = router;
