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
exports.getUserApplications = exports.applyJob = void 0;
const Application_1 = __importDefault(require("../models/Application"));
const applyJob = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { jobId, resumeUrl, coverLetter } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
      const existingApplication = yield Application_1.default.findOne({
        job: jobId,
        user: userId,
      });
      if (existingApplication) {
        return res
          .status(400)
          .json({ message: "You have already applied for this job." });
      }
      const application = yield Application_1.default.create({
        job: jobId,
        user: userId,
        resumeUrl,
        coverLetter,
        status: "Pending",
      });
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
exports.applyJob = applyJob;
const getUserApplications = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
      const applications = yield Application_1.default
        .find({
          user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        })
        .populate("job", "title companyName")
        .populate("user", "name email");
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
exports.getUserApplications = getUserApplications;
