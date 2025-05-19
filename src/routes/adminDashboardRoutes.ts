import express from "express";
import {
  getAdminJobs,
  getApplicationsForAdminJobs,
} from "../controllers/adminDashboardController";
import { verifyAdminToken } from "../middlewares/verifyToken";

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
 *   name: Admin Dashboard
 *   description: Routes for admin to manage jobs and applications
 */

/**
 * @swagger
 * /api/admin/dashboard/jobs:
 *   get:
 *     summary: Get all job listings
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all job posts
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/dashboard/jobs",
  asyncHandler(verifyAdminToken),
  asyncHandler(getAdminJobs)
);

/**
 * @swagger
 * /api/admin/dashboard/applications:
 *   get:
 *     summary: Get all applications for admin jobs
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all applications for admin jobs
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/dashboard/applications",
  asyncHandler(verifyAdminToken),
  asyncHandler(getApplicationsForAdminJobs)
);

export default router;
