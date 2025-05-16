import express from "express";
import { applyForJob, getUserApplications } from "../controllers/applicationController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

// Wrap async route handlers to catch errors and pass them to next()
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/apply/:jobId", authenticateJWT, authorizeRoles("user"), asyncHandler(applyForJob));
router.get("/my-applications", authenticateJWT, authorizeRoles("user"), asyncHandler(getUserApplications));

export default router;
