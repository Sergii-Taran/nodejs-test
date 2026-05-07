import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
      trim: true,
    },
    avgMark: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    onDuty: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

studentSchema.index({ gender: 1, avgMark: 1 });

export const Student = model('Student', studentSchema);
