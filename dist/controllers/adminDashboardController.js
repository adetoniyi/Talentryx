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
exports.getApplicationsForAdminJobs = exports.getAdminJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const Application_1 = __importDefault(require("../models/Application"));
const getAdminJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const jobs = yield Job_1.default.find({ postedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAdminJobs = getAdminJobs;
const getApplicationsForAdminJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const jobs = yield Job_1.default.find({ postedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        const jobIds = jobs.map((job) => job._id);
        const applications = yield Application_1.default.find({ job: { $in: jobIds } })
            .populate("user", "email")
            .populate("job", "title");
        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getApplicationsForAdminJobs = getApplicationsForAdminJobs;
