"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const application_controller_1 = require("../controllers/application.controller");
const router = express_1.default.Router();
/**
 * @route POST /api/applications
 * @desc Apply for a job
 */
router.post("/", (0, auth_1.protect)(), application_controller_1.applyJob);
/**
 * @route GET /api/applications
 * @desc Get user applications
 */
router.get("/", (0, auth_1.protect)(), application_controller_1.getUserApplications);
// Removed duplicate applyJob function; using the imported one from controller.
exports.default = router;
