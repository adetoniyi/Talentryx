"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/admin/auth.controller");
const router = express_1.default.Router();
/**
 * @route POST /api/admin/register
 * @desc Register an admin
 */
router.post("/register", auth_controller_1.adminRegister);
/**
 * @route POST /api/admin/verify
 * @desc Verify admin email
 */
router.post("/verify", auth_controller_1.adminVerifyEmail);
/**
 * @route POST /api/admin/login
 * @desc Admin login
 */
router.post("/login", auth_controller_1.adminLogin);
exports.default = router;
