"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const verifyToken_1 = require("../middlewares/verifyToken");
const authMiddleware_2 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
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
 *   name: User Authentication
 *   description: User authentication endpoints
 */
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/signup", asyncHandler(userAuthController_1.userSignup));
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", asyncHandler(userAuthController_1.userLogin));
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [User Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authMiddleware_1.authenticateJWT, asyncHandler(verifyToken_1.verifyAdminToken), asyncHandler(userAuthController_1.getUserInfo), asyncHandler((0, authMiddleware_2.authorizeRoles)("user", "admin")));
exports.default = router;
