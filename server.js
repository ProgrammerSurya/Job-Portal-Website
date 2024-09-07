// API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// Package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

// Security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// File imports
import connectDB from "./config/db.js";

// Routes imports
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import jobRoutes from "./routes/jobsRoutes.js";  // Ensure this is correctly imported
import userRoutes from "./routes/userRoutes.js";

// Dotenv config
dotenv.config();

// MongoDB connection
connectDB();

// Swagger API config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Express.js Job Portal Application",
    },
    servers: [
      {
        // url: "http://localhost:8080", // Local development server
        url: "https://nodejs-job-portal-app.onrender.com" // Production server
      },
    ],
  },
  apis: ["./routes/*.js"],  // Point to your routes for Swagger documentation
};

const spec = swaggerDoc(options);

// Create the express app
const app = express();

// Middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);  // Ensure the correct route handler is used

// Swagger documentation route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// Validation middleware for handling errors
app.use(errorMiddleware);

// Port configuration
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} Mode on port ${PORT}`.bgGreen.white
  );
});
