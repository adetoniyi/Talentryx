"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
require("express-async-errors"); // For async error handling
const errorHandler_1 = require("./middlewares/errorHandler");
const adminAuthRoutes_1 = __importDefault(require("./routes/adminAuthRoutes"));
const userAuthRoutes_1 = __importDefault(require("./routes/userAuthRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const adminDashboardRoutes_1 = __importDefault(require("./routes/adminDashboardRoutes"));
const swagger_1 = require("./swagger/swagger");
const app = (0, express_1.default)();
// Load swagger docs
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "./swagger/swagger.yaml"));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/api/admin/auth", adminAuthRoutes_1.default);
app.use("/api/user/auth", userAuthRoutes_1.default);
app.use("/api/jobs", jobRoutes_1.default);
app.use("/api/applications", applicationRoutes_1.default);
app.use("/api/profiles", profileRoutes_1.default);
app.use("/api/admin/dashboard", adminDashboardRoutes_1.default);
// Error Middleware
app.use(errorHandler_1.errorHandler);
// Swagger setup
(0, swagger_1.setupSwagger)(app);
exports.default = app;
