import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentsController.js';

import {
  createStudentSchema,
  studentIdParamSchema,
  updateStudentBodySchema,
  getStudentsSchema,
} from '../validations/studentsValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/students', authenticate);

router.get('/students', celebrate(getStudentsSchema), getStudents);

router.get(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  getStudentById,
);

router.post('/students', celebrate(createStudentSchema), createStudent);

router.delete(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  deleteStudent,
);

router.patch(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  celebrate(updateStudentBodySchema),
  updateStudent,
);

export default router;
