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
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, companyName, description, location, jobType, salaryRange, applicationDeadline } = req.body;
    const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const job = yield Job_1.default.create({
            title,
            companyName,
            description,
            location,
            jobType,
            salaryRange,
            applicationDeadline,
            postedBy: adminId,
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createJob = createJob;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Job_1.default.find();
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getJobs = getJobs;
const getJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job_1.default.findById(req.params.id);
        if (!job)
            return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getJobById = getJobById;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job_1.default.findById(req.params.id);
        if (!job)
            return res.status(404).json({ message: "Job not found" });
        Object.assign(job, req.body);
        yield job.save();
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job_1.default.findById(req.params.id);
        if (!job)
            return res.status(404).json({ message: "Job not found" });
        yield job.deleteOne();
        res.status(200).json({ message: "Job removed" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteJob = deleteJob;
