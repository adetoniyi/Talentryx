"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminDashboardController_1 = require("../controllers/adminDashboardController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
/**
 * Utility to wrap async route handlers and forward errors to Express error handler.
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Routes for admin to manage jobs and applications
 */
/**
 * @swagger
 * /api/admin/dashboard/jobs:
 *   get:
 *     summary: Get all job listings
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all job posts
 *       401:
 *         description: Unauthorized
 */
router.get("/dashboard/jobs", asyncHandler(verifyToken_1.verifyAdminToken), asyncHandler(adminDashboardController_1.getAdminJobs));
/**
 * @swagger
 * /api/admin/dashboard/applications:
 *   get:
 *     summary: Get all applications for admin jobs
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all applications for admin jobs
 *       401:
 *         description: Unauthorized
 */
router.get("/dashboard/applications", asyncHandler(verifyToken_1.verifyAdminToken), asyncHandler(adminDashboardController_1.getApplicationsForAdminJobs));
exports.default = router;
