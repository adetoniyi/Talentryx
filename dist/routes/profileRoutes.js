"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const profile_controller_1 = require("../controllers/profile.controller");
const getUserProfile = (req, res, next) => {
    // Example logic: send a dummy profile object
    res.json({ message: "User profile fetched successfully" });
};
exports.getUserProfile = getUserProfile;
const upload = (0, multer_1.default)({ dest: "uploads/" });
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authenticateJWT, exports.getUserProfile);
router.post("/", authMiddleware_1.authenticateJWT, upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
]), profile_controller_1.createOrUpdateProfile);
exports.default = router;
