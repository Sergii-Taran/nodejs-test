import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(studentsRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
