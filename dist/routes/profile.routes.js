"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const profile_controller_1 = require("../controllers/profile.controller");
const router = express_1.default.Router();
/**
 * @route GET /api/profile
 * @desc Get user profile
 */
router.get("/", (0, auth_1.protect)(), profile_controller_1.getProfile);
/**
 * @route PUT /api/profile
 * @desc Update user profile
 */
router.put("/", (0, auth_1.protect)(), profile_controller_1.updateProfile);
// Controller functions are imported from ../controllers/profile.controller
exports.default = router;
