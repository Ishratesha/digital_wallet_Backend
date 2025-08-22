import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import transactionRoutes from './app/modules/transaction/transaction.route';
import adminRoutes from './app/modules/admin/admin.route';
import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// ✅ Define allowed origins by environment
const devOrigins = [
  "http://localhost:5173", // Vite dev
  "http://localhost:3000", // Next.js dev
];

const prodOrigins = [
  "https://your-frontend.vercel.app", // replace with your deployed frontend
];

// ✅ Choose based on NODE_ENV
const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server calls (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed for this origin"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('dev'));

// Application Routes
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes); // Assuming you have AuthRoutes defined
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('🌐 Digital Wallet System API is running...');
});

// Global Error Handler
//app.use(globalErrorHandler);

// Handle 404
//app.use(notFoundHandler);

export default app;
