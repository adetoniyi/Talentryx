"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.createOrUpdateProfile = void 0;
exports.uploadToCloudinary = uploadToCloudinary;
const profile_1 = __importDefault(require("../models/profile"));
function uploadToCloudinary(filePath, folder) {
    // Placeholder implementation, replace with actual Cloudinary upload logic
    return Promise.resolve({
        secure_url: "https://example.com/dummy-url",
    });
}
const createOrUpdateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, phone, experience, skills } = req.body;
        const resumeFile = req.files && !Array.isArray(req.files) && "resume" in req.files
            ? req.files["resume"]
            : undefined;
        const profilePic = req.files && !Array.isArray(req.files) && "profilePicture" in req.files
            ? req.files["profilePicture"]
            : undefined;
        let resumeUrl = "";
        let profilePictureUrl = "";
        if (resumeFile) {
            const resumeUpload = yield uploadToCloudinary(resumeFile[0].path, "resumes");
            resumeUrl = resumeUpload.secure_url;
        }
        if (profilePic) {
            const picUpload = yield uploadToCloudinary(profilePic[0].path, "profile_pics");
            profilePictureUrl = picUpload.secure_url;
        }
        const update = Object.assign(Object.assign({ name,
            phone,
            experience, skills: (skills === null || skills === void 0 ? void 0 : skills.split(",")) || [] }, (resumeUrl && { resumeUrl })), (profilePictureUrl && { profilePictureUrl }));
        const profile = yield profile_1.default.findOneAndUpdate({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, update, { new: true, upsert: true });
        res.status(200).json({ success: true, data: profile });
    }
    catch (err) {
        next(err);
    }
});
exports.createOrUpdateProfile = createOrUpdateProfile;
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const profile = yield profile_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!profile)
            return res.status(404).json({ success: false, error: "Profile not found" });
        res.status(200).json({ success: true, data: profile });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserProfile = getUserProfile;
