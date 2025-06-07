import express from "express";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscribtion.routes.js";
import userRouter from "./routes/user.routes.js";
import { PORT } from "./config/env.js";
import conncetMongoDB from "./database/mongoDb.js";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await conncetMongoDB();
});
export default app;
