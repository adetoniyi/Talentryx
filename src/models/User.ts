import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  resumeUrl?: string;
  profilePicUrl?: string;
  qualifications?: string[];
  experiences?: string[];
  skills?: string[];
  otherDetails?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    resumeUrl: { type: String },
    profilePicUrl: { type: String },
    qualifications: [{ type: String }],
    experiences: [{ type: String }],
    skills: [{ type: String }],
    otherDetails: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
