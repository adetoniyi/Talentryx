"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("../../controllers/admin/dashboard.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
/**
 * @route GET /api/admin/dashboard
 * @desc Get dashboard stats
 */
router.get("/dashboard", (0, auth_1.protect)(["admin"]), (req, res, next) => {
    Promise.resolve((0, dashboard_controller_1.getDashboardStats)(req, res)).catch(next);
    return;
});
/**
 * @route GET /api/admin/jobs
 * @desc Get all jobs posted by the admin
 */
router.get("/jobs", (0, auth_1.protect)(["admin"]), dashboard_controller_1.getAllJobs);
/**
 * @route GET /api/admin/applications
 * @desc Get all job applications
 */
router.get("/applications", (0, auth_1.protect)(["admin"]), dashboard_controller_1.getAllApplications);
/**
 * @route PATCH /api/admin/applications/:applicationId/status
 * @desc Update application status (e.g., accept or reject)
 */
router.patch("/applications/:applicationId/status", (0, auth_1.protect)(["admin"]), (req, res, next) => {
    Promise.resolve((0, dashboard_controller_1.updateApplicationStatus)(req, res)).catch(next);
});
exports.default = router;
