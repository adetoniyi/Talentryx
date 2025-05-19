import express from "express";
import {
  userSignup,
  userLogin,
  getUserInfo,
} from "../controllers/userAuthController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { verifyAdminToken } from "../middlewares/verifyToken";
import { authorizeRoles } from "../middlewares/authMiddleware";
const router = express.Router();

/**
 * Utility to wrap async route handlers and forward errors to Express error handler.
 */
function asyncHandler(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => any
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
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
router.post("/signup", asyncHandler(userSignup));

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
router.post("/login", asyncHandler(userLogin));

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
router.get(
  "/me",
  authenticateJWT,
  asyncHandler(verifyAdminToken),
  asyncHandler(getUserInfo),
  asyncHandler(authorizeRoles("user", "admin"))
);

export default router;
