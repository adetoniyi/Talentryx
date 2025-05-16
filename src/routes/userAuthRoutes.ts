import express, { Request, Response, NextFunction } from "express";
import { userSignup, userLogin } from "../controllers/userAuthController";

const router = express.Router();

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/signup", asyncHandler(userSignup));
router.post("/login", asyncHandler(userLogin));

export default router;
