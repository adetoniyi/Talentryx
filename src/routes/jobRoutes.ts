import express from "express";
import {
  createJob,
  deleteJob,
  getJobs,
  getJobById,
  updateJob,
} from "../controllers/jobController";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * Utility to wrap async route handlers and forward errors to Express error handler.
 */
function asyncHandler(
  fn: (req: express.Request, res: express.Response, next: express.NextFunction) => any
) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs (public)
 */
router.get("/", getJobs);

/**
 * @route   POST /api/jobs
 * @desc    Create a job (admin only)
 */
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  asyncHandler(createJob)
);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job (admin only)
 */
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  asyncHandler(updateJob)
);

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job (admin only)
 */
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  asyncHandler(deleteJob)
);

export default router;
