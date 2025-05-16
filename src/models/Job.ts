import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  companyName: string;
  description: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract";
  salaryRange?: string;
  applicationDeadline: Date;
  postedBy: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Contract"], required: true },
    salaryRange: { type: String },
    applicationDeadline: { type: Date, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>("Job", JobSchema);
