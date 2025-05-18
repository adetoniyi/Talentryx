"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
// import { setupSwagger } from './docs/swagger'; // Import swagger setup
// setupSwagger(app); // Setup swagger documentation
// Removed duplicate mongoose import
const mongoURL = process.env.MONGODB_URL;
if (!mongoURL) {
    throw new Error('MONGODB_URL is not defined in environment variables');
}
// Connect to MongoDB
mongoose_1.default.connect(mongoURL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB connection failed", err));
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(() => {
    app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
