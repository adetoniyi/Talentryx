import express from "express";
import multer from "multer";
import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createOrUpdateProfile,
  getUserProfile,
} from "../controllers/profile.controller";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

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
 *                 type: number
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
router.post(
  "/",
  asyncHandler(authenticateJWT),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  asyncHandler(createOrUpdateProfile)
);

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
router.get("/", asyncHandler(authenticateJWT), asyncHandler(getUserProfile));

export default router;
