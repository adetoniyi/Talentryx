"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Sample admin route
router.get("/test", (req, res) => {
    res.json({ message: "Admin route working!" });
});
exports.default = router;
