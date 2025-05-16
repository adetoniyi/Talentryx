import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyAdminToken } from "../middlewares/verifyToken";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { Router } from "express";

const router = Router();


export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    verifyAdminToken(req, res, () => {
      const user = req.user;

      if (!user || !roles.includes(user.role)) {
        res.status(403).json({ message: "Forbidden: Access is denied." });
        return;
      }

      next();
    });
  };
};
export const getApplicationsForAdminJobs: RequestHandler = (req, res, next) => {
    // Implement your logic here
    res.send("Applications for admin jobs");
};

export const customAuthenticateJWT: RequestHandler = (req, res, next) => {
  // Implement your logic here
  next();
};

router.get("/my-applications", customAuthenticateJWT, authorizeRoles("admin"), getApplicationsForAdminJobs);

export default router;