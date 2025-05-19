import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import "express-async-errors"; // For async error handling
import path from "path";
import fs from "fs";

import { errorHandler } from "./middlewares/errorHandler";
import adminAuthRoutes from "./routes/adminAuthRoutes";
import userAuthRoutes from "./routes/userAuthRoutes";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import profileRoutes from "./routes/profileRoutes";
import adminDashboardRoutes from "./routes/adminDashboardRoutes";
import swaggerJSDoc from "swagger-jsdoc";

// swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal API",
      version: "1.0.0",
      description: "API documentation for Job Portal",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const swaggerDocument = swaggerSpec;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
