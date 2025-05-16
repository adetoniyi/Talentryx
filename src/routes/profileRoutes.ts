import express from "express";
import multer from "multer";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { createOrUpdateProfile } from "../controllers/profile.controller";
import { Request, Response, NextFunction } from "express";

export const getUserProfile = (req: Request, res: Response, next: NextFunction) => {
  // Example logic: send a dummy profile object
  res.json({ message: "User profile fetched successfully" });
};

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", authenticateJWT, getUserProfile);
router.post(
  "/",
  authenticateJWT,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  createOrUpdateProfile
);

export default router;
