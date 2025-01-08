import mongoose, { Schema, model, models } from "mongoose";

const AntrianSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["waiting", "in-process", "completed"], default: "waiting" },
  vehicleType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Antrian || model("Antrian", AntrianSchema);