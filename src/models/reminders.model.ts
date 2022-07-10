import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';

const reminderSchema = new mongoose.Schema(
  {
    description: String,
    user: Number,
    date: String,
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

reminderSchema.plugin(autoIncrement, { model: 'Reminder', field: 'id' });
export default mongoose.model('Reminder', reminderSchema);
