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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

studentSchema.index({ userId: 1, gender: 1, avgMark: 1 });

export const Student = model('Student', studentSchema);
