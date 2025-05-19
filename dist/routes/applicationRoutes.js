"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authMiddleware_2 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
/**
 * Utility to wrap async route handlers and forward errors to Express error handler.
 */
function asyncHandler(fn) {
    return (req, res, next) => {
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
router.post("/apply/:jobId", authMiddleware_1.authenticateJWT, (0, authMiddleware_2.authorizeRoles)("user", "admin"), asyncHandler(applicationController_1.applyForJob));
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
router.get("/my-applications", authMiddleware_1.authenticateJWT, (0, authMiddleware_2.authorizeRoles)("user", "admin"), asyncHandler(applicationController_1.getUserApplications));
exports.default = router;
