import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import { Student } from './models/student.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

app.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json(student);
});

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
