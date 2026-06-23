import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './src/db/mongo-db-connect.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './src/routes/routes.js';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Inventory Backend' });
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Inventory Backend Server is running on port ${PORT}`);
});