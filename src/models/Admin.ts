import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicUrl?: string;
  isVerified: boolean;
  verificationToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profilePicUrl: { type: String },
    isVerified: { type: Boolean, default: true },
    verificationToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema);
