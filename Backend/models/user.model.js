import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["dealer", "admin"],
      default: "dealer",
    },
    location: { type: String },
    language: { type: String, enum: ["en", "ur", "sd"], default: "en" },
    profileImage: { type: String },
    documents: [
      {
        fileUrl: { type: String },
        type: {
          type: String,
          enum: ["cnic", "tractor", "fertilizer", "noc", "other"],
          default: "other",
        },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    locationCoords: {
      lat: { type: Number },
      lng: { type: Number },
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
