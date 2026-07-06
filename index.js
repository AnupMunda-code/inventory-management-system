import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import bodyParser from 'body-parser';

import { connectDB } from './src/db/mongo-db-connect.js';
import routes from './src/routes/routes.js';

const PORT = process.env.PORT || 8000;
const app = express();

// Trust the first proxy (Render/other PaaS) so client IPs are read correctly
// for rate limiting and logging.
app.set('trust proxy', 1);

// --- Security & performance middleware ---

// Secure HTTP headers. `crossOriginResourcePolicy` is relaxed to "cross-origin"
// because this API is consumed by a browser frontend on a different domain.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS. Defaults to allowing all origins; set CORS_ORIGIN (comma-separated list)
// in production to restrict access to the deployed frontend.
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : '*';
app.use(cors({ origin: corsOrigin }));

// Basic rate limiting to protect against abuse/brute-force. Generous limit so
// normal dashboard usage is never throttled.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (also seeds the default admin on first run).
connectDB();

// Health check endpoint (used by Render and for uptime monitoring).
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Inventory Backend' });
});

// Mount all API routes under /api.
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Inventory Backend Server is running on port ${PORT}`);
});
