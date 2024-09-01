//package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

//files imports
import connectDB from "./config/db.js";
//routes imports
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
//Dot env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);

//validation middleware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080;
//listen
app.listen(8080, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgGreen.white
  );
});
