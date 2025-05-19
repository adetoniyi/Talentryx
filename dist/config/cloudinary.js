"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({ cloudinary_url: process.env.CLOUDINARY_URL });
if (!process.env.CLOUDINARY_URL) {
    throw new Error("CLOUDINARY_URL is not defined in environment variables");
}
// Check if the required environment variables are defined
exports.default = cloudinary_1.v2;
