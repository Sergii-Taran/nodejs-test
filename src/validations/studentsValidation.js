import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(12).max(65).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    avgMark: Joi.number().min(2).max(12).required(),
    onDuty: Joi.boolean(),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const studentIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateStudentBodySchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30),
    age: Joi.number().integer().min(12).max(65),
    gender: Joi.string().valid('male', 'female', 'other'),
    avgMark: Joi.number().min(2).max(12),
    onDuty: Joi.boolean(),
  }).min(1),
};

export const getStudentsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};
