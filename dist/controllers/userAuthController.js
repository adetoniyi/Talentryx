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
exports.getUserInfo = exports.userLogin = exports.userSignup = void 0;
const User_1 = __importDefault(require("../models/User"));
const authServices_1 = require("../services/authServices");
const generateToken_1 = require("../utils/generateToken");
// User Signup
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        return res
            .status(400)
            .json({ success: false, error: "User already exists" });
    }
    const hashedPassword = yield (0, authServices_1.hashPassword)(password);
    const user = new User_1.default({ name, email, password: hashedPassword });
    yield user.save();
    const token = (0, generateToken_1.generateToken)(user._id.toString(), "user");
    res.status(201).json({ success: true, token });
});
exports.userSignup = userSignup;
// User Login
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .json({ success: false, error: "Invalid credentials" });
    }
    const isMatch = yield (0, authServices_1.comparePassword)(password, user.password);
    if (!isMatch) {
        return res
            .status(400)
            .json({ success: false, error: "Invalid credentials" });
    }
    const token = (0, generateToken_1.generateToken)(user._id.toString(), "user");
    res.json({ success: true, token });
});
exports.userLogin = userLogin;
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserInfo = getUserInfo;
