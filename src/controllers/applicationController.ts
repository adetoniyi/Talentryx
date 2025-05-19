import { Request, Response, NextFunction } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import Profile from "../models/profile";

export const applyForJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const profile = await Profile.findOne({ user: req.user?.id });
    if (!profile || !profile.resumeUrl)
      return res
        .status(400)
        .json({
          error: "Complete your profile and upload resume before applying",
        });

    const alreadyApplied = await Application.findOne({
      job: jobId,
      user: req.user?.id,
    });
    if (alreadyApplied)
      return res
        .status(400)
        .json({ error: "You have already applied for this job" });

    const application = await Application.create({
      job: jobId,
      user: req.user?.id,
      resumeUrl: profile.resumeUrl,
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

export const getUserApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applications = await Application.find({ user: req.user?.id })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
};

export const getApplicationsForJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      appId,
      { status },
      { new: true }
    );

    if (!application)
      return res.status(404).json({ error: "Application not found" });

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};
