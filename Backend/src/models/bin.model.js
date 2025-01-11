// models/bin.model.js
import mongoose from 'mongoose';

const binSchema = new mongoose.Schema({
  bin: { type: String, required: true },
  locality: { type: String, required: true },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  loadType: { type: String, required: true },
  driverEmail: { type: String, required: true },
  cyclePeriod: { type: String, required: true },
  bestRoute: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
});

const Bin = mongoose.model('Bin', binSchema);

export default Bin;
