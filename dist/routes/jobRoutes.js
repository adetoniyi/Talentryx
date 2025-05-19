"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = require("../controllers/jobController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
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
 *   name: Jobs
 *   description: Job management endpoints
 */
/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", asyncHandler(verifyToken_1.verifyAdminToken), authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("admin"), asyncHandler(jobController_1.createJob));
/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 */
router.get("/", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("user", "admin"), asyncHandler(jobController_1.getJobs));
/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
router.get("/:id", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("user", "admin"), asyncHandler(jobController_1.getJobById));
/**
 * @swagger
 * /api/jobs/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */
router.put("/:id", asyncHandler(verifyToken_1.verifyAdminToken), authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("admin"), asyncHandler(jobController_1.updateJob));
/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */
router.delete("/:id", asyncHandler(verifyToken_1.verifyAdminToken), authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("admin"), asyncHandler(jobController_1.deleteJob));
exports.default = router;
