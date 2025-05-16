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
exports.updateApplicationStatus = exports.getApplicationsForJob = exports.getUserApplications = exports.applyForJob = void 0;
const Application_1 = __importDefault(require("../models/Application"));
const Job_1 = __importDefault(require("../models/Job"));
const profile_1 = __importDefault(require("../models/profile"));
const applyForJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { jobId } = req.params;
        const job = yield Job_1.default.findById(jobId);
        if (!job)
            return res.status(404).json({ error: "Job not found" });
        const profile = yield profile_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!profile || !profile.resumeUrl)
            return res.status(400).json({ error: "Complete your profile and upload resume before applying" });
        const alreadyApplied = yield Application_1.default.findOne({ job: jobId, user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id });
        if (alreadyApplied)
            return res.status(400).json({ error: "You have already applied for this job" });
        const application = yield Application_1.default.create({
            job: jobId,
            user: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
            resumeUrl: profile.resumeUrl,
        });
        res.status(201).json({ success: true, data: application });
    }
    catch (err) {
        next(err);
    }
});
exports.applyForJob = applyForJob;
const getUserApplications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const applications = yield Application_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id })
            .populate("job")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: applications });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserApplications = getUserApplications;
const getApplicationsForJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId } = req.params;
        const applications = yield Application_1.default.find({ job: jobId })
            .populate("user", "email")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: applications });
    }
    catch (err) {
        next(err);
    }
});
exports.getApplicationsForJob = getApplicationsForJob;
const updateApplicationStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId } = req.params;
        const { status } = req.body;
        const application = yield Application_1.default.findByIdAndUpdate(appId, { status }, { new: true });
        if (!application)
            return res.status(404).json({ error: "Application not found" });
        res.status(200).json({ success: true, data: application });
    }
    catch (err) {
        next(err);
    }
});
exports.updateApplicationStatus = updateApplicationStatus;
