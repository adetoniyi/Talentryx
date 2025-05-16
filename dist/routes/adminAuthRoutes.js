"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthenticateJWT = exports.getApplicationsForAdminJobs = exports.authorizeRoles = void 0;
const verifyToken_1 = require("../middlewares/verifyToken");
const express_1 = require("express");
const router = (0, express_1.Router)();
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        (0, verifyToken_1.verifyAdminToken)(req, res, () => {
            const user = req.user;
            if (!user || !roles.includes(user.role)) {
                res.status(403).json({ message: "Forbidden: Access is denied." });
                return;
            }
            next();
        });
    };
};
exports.authorizeRoles = authorizeRoles;
const getApplicationsForAdminJobs = (req, res, next) => {
    // Implement your logic here
    res.send("Applications for admin jobs");
};
exports.getApplicationsForAdminJobs = getApplicationsForAdminJobs;
const customAuthenticateJWT = (req, res, next) => {
    // Implement your logic here
    next();
};
exports.customAuthenticateJWT = customAuthenticateJWT;
router.get("/my-applications", exports.customAuthenticateJWT, (0, exports.authorizeRoles)("admin"), exports.getApplicationsForAdminJobs);
exports.default = router;
