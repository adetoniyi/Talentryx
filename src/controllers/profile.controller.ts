import { Request, Response, NextFunction } from "express";
import Profile from "../models/profile";

export interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: any;
}

export function uploadToCloudinary(filePath: string, folder: string): Promise<CloudinaryUploadResult> {
  // Placeholder implementation, replace with actual Cloudinary upload logic
  return Promise.resolve({
    secure_url: "https://example.com/dummy-url",
  });
}

export const createOrUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone, experience, skills } = req.body;

    const resumeFile =
      req.files && !Array.isArray(req.files) && "resume" in req.files
        ? (req.files["resume"] as any)
        : undefined;
    const profilePic =
      req.files && !Array.isArray(req.files) && "profilePicture" in req.files
        ? (req.files["profilePicture"] as any)
        : undefined;

    let resumeUrl = "";
    let profilePictureUrl = "";

    if (resumeFile) {
      const resumeUpload = await uploadToCloudinary(resumeFile[0].path, "resumes");
      resumeUrl = resumeUpload.secure_url;
    }

    if (profilePic) {
      const picUpload = await uploadToCloudinary(profilePic[0].path, "profile_pics");
      profilePictureUrl = picUpload.secure_url;
    }

    const update = {
      name,
      phone,
      experience,
      skills: skills?.split(",") || [],
      ...(resumeUrl && { resumeUrl }),
      ...(profilePictureUrl && { profilePictureUrl }),
    };

    const profile = await Profile.findOneAndUpdate(
      { user: req.user?.id },
      update,
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.findOne({ user: req.user?.id });
    if (!profile) return res.status(404).json({ success: false, error: "Profile not found" });

    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};
