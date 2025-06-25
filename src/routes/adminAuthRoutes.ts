  import express, { Request, Response, NextFunction } from "express";
import {
  adminSignup,
  adminLogin,
  verifyAdminEmail,
} from "../controllers/adminAuthController";

const router = express.Router();

// Middleware to authenticate JWT token
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
 *   name: Authentication
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/admin/auth/signup:
 *   post:
 *     summary: Admin signup
 *     tags: [Authentication]
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
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Bad request
 */
router.post("/signup", asyncHandler(adminSignup));

/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Authentication]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/login", asyncHandler(adminLogin));

/**
 * @swagger
 * /api/admin/auth/verify/{token}:
 *   get:
 *     summary: Verify admin email using token
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token sent to admin email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get("/verify/token", asyncHandler(verifyAdminEmail));

export default router;
