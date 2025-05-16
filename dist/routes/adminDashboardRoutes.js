"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationsForAdminJobs = exports.getAdminJobs = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const getAdminJobs = (req, res, next) => {
    // your logic here
    const someCondition = true; // Replace with your actual condition
    if (someCondition) {
        const data = {}; // Replace with your actual data
        res.json(data);
        return;
    }
    // Always send a response or call next with an error
    res.status(404).json({ message: "Not found" });
};
exports.getAdminJobs = getAdminJobs;
const getApplicationsForAdminJobs = (req, res, next) => {
    // your logic here
    const someOtherCondition = true; // Replace with your actual condition
    if (someOtherCondition) {
        const applications = []; // Replace with your actual data or specify a more precise type
        res.json(applications);
        return;
    }
    // Always send a response or call next with an error
    res.status(404).json({ message: "Not found" });
};
exports.getApplicationsForAdminJobs = getApplicationsForAdminJobs;
router.get("/my-jobs", exports.getAdminJobs);
router.get("/my-applications", exports.getApplicationsForAdminJobs);
exports.default = router;
