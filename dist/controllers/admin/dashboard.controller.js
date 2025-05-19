"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatus =
  exports.getAllApplications =
  exports.getAllJobs =
  exports.getDashboardStats =
    void 0;
const Job_1 = __importDefault(require("../../models/Job"));
const Application_1 = __importDefault(require("../../models/Application"));
const getDashboardStats = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const jobsCount = yield Job_1.default.countDocuments();
      const applicationsCount = yield Application_1.default.countDocuments();
      res.status(200).json({
        jobsCount,
        applicationsCount,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
exports.getDashboardStats = getDashboardStats;
const getAllJobs = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const jobs = yield Job_1.default
        .find()
        .populate("postedBy", "name email");
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
exports.getAllJobs = getAllJobs;
const getAllApplications = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const applications = yield Application_1.default
        .find()
        .populate("job", "title companyName")
        .populate("user", "name email");
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
exports.getAllApplications = getAllApplications;
const updateApplicationStatus = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { applicationId } = req.params;
    const { status } = req.body;
    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    try {
      const application = yield Application_1.default.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      application.status = status;
      yield application.save();
      res
        .status(200)
        .json({ message: "Application status updated", application });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
exports.updateApplicationStatus = updateApplicationStatus;
