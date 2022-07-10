import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';

const analyticSchema = new mongoose.Schema(
  {
    id: Number,
    eventType: String,
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

analyticSchema.plugin(autoIncrement, { model: 'Analytic', field: 'id' });
export default mongoose.model('Analytic', analyticSchema);
