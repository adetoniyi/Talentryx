"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.post("/signup", asyncHandler(userAuthController_1.userSignup));
router.post("/login", asyncHandler(userAuthController_1.userLogin));
exports.default = router;
