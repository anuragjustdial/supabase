import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { loggerHandler } from "./middleware/loggerHandler.js";
import categoryRouter from "./routes/categories.js";
import productRouter from "./routes/products.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));
      
// Logger middleware
app.use(loggerHandler);

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

app.get("/api/crash", (req, res) => {
  throw new Error("Simulated server crash");
});

app.use(errorHandler);

app.listen(3000, () => console.log("Server is running on port 3000"));

