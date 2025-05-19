import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  resumeUrl: string;
  status: "applied" | "accepted" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    resumeUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "accepted", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IApplication>("Application", ApplicationSchema);
