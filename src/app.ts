import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import "express-async-errors"; // For async error handling

import { errorHandler } from "./middlewares/errorHandler";
import adminAuthRoutes from "./routes/adminAuthRoutes";
import userAuthRoutes from "./routes/userAuthRoutes";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import profileRoutes from "./routes/profileRoutes";
import adminDashboardRoutes from "./routes/adminDashboardRoutes";
import { setupSwagger } from "./swagger/swagger";

const app = express();

// Load swagger docs
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger/swagger.yaml"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);

// Error Middleware
app.use(errorHandler);

// Swagger setup
setupSwagger(app);

export default app;
