import express, { Application, Request, Response } from "express";
import cors from "cors";

// ✅ Import your routes
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import transactionRoutes from "./app/modules/transaction/transaction.route";
import adminRoutes from "./app/modules/admin/admin.route";

const app: Application = express();

// ✅ CORS: Allow all origins temporarily but support credentials
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins (temporary setup)
      callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Application Routes
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Health check
app.get("/", (req: Request, res: Response) => {
  res.send("🌐 Digital Wallet System API is running...");
});

// Global Error Handler (optional)
// app.use(globalErrorHandler);

// Handle 404 (optional)
// app.use(notFoundHandler);

export default app;
