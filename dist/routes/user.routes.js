"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Sample user route
router.get("/test", (req, res) => {
    res.json({ message: "User route working!" });
});
exports.default = router;
