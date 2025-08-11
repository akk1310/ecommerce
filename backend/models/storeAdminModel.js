import mongoose from "mongoose";

const storeAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storeName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("StoreAdmin", storeAdminSchema);
