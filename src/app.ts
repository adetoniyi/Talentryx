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
import { swaggerDocument } from './swagger/swagger'


const app = express();

/* Import swagger setup
/const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf8')
);
const swaggerOptions = {
  swaggerOptions: {
    url: 'http://localhost:5000/api-docs',
  },
};
*/
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
