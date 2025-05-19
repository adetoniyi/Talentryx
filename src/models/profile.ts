import mongoose, { Document, Schema } from "mongoose";

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  resumeUrl?: string;
  profilePictureUrl?: string;
  experience?: string;
  skills?: string[];
}

const ProfileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String },
    profilePictureUrl: { type: String },
    experience: { type: String },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);
