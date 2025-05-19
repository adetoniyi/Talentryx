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
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const Job_1 = __importDefault(require("../models/Job"));
// Create a job
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newJob = yield Job_1.default.create(req.body);
        res.status(201).json({ success: true, data: newJob });
    }
    catch (err) {
        next(err);
    }
});
exports.createJob = createJob;
// Get all jobs with filters
const getJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, jobType, title } = req.query;
        let query = {};
        if (location)
            query.location = { $regex: location, $options: "i" };
        if (jobType)
            query.jobType = jobType;
        if (title)
            query.title = { $regex: title, $options: "i" };
        const jobs = yield Job_1.default.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    }
    catch (err) {
        next(err);
    }
});
exports.getJobs = getJobs;
// Get single job
const getJobById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job_1.default.findById(req.params.id);
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        res.status(200).json(job);
    }
    catch (err) {
        next(err);
    }
});
exports.getJobById = getJobById;
// Update job
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const job = yield Job_1.default.findOneAndUpdate({ _id: req.params.id, createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, req.body, { new: true });
        if (!job)
            return res
                .status(404)
                .json({ success: false, error: "Job not found or not authorized" });
        res.status(200).json({ success: true, data: job });
    }
    catch (err) {
        next(err);
    }
});
exports.updateJob = updateJob;
// Delete job
const deleteJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const job = yield Job_1.default.findOneAndDelete({
            _id: req.params.id,
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        if (!job)
            return res
                .status(404)
                .json({ success: false, error: "Job not found or not authorized" });
        res
            .status(200)
            .json({ success: true, message: "Job deleted successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteJob = deleteJob;
