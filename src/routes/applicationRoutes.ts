import express from "express";
import {
  applyForJob,
  getUserApplications,
} from "../controllers/applicationController";
import { authenticateJWT } from "../middlewares/authMiddleware";
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

// Wrap async route handlers to catch errors and pass them to next()

/**
 * @swagger
 * /api/applications/apply/{jobId}:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to apply for
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/apply/:jobId",
  authenticateJWT,
  authorizeRoles("user", "admin"),
  asyncHandler(applyForJob)
);

/**
 * @swagger
 * /api/applications/my-applications:
 *   get:
 *     summary: Get all applications for the logged-in user
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-applications",
  authenticateJWT,
  authorizeRoles("user", "admin"),
  asyncHandler(getUserApplications)
);

export default router;
