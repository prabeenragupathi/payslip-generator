import express from "express";
import cors from "cors";
import { PORT } from "#config/env.js";
import { errorHandler } from "#utils/error.js";
import v1Routes from "#routes/v1/index.js";

const app = express();

app.use(cors());
app.use(express.json());
//routes
app.use("/api/v1", v1Routes);

//! error handler middleware
app.use(errorHandler);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
