"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = require("../controllers/jobController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
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
 * @route   GET /api/jobs
 * @desc    Get all jobs (public)
 */
router.get("/", jobController_1.getJobs);
/**
 * @route   POST /api/jobs
 * @desc    Create a job (admin only)
 */
router.post("/", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("admin"), asyncHandler(jobController_1.createJob));
/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job (admin only)
 */
router.put("/:id", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("admin"), asyncHandler(jobController_1.updateJob));
/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job (admin only)
 */
router.delete("/:id", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("admin"), asyncHandler(jobController_1.deleteJob));
exports.default = router;
