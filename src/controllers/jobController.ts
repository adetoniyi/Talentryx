import { Request, Response, NextFunction } from "express";
import Job from "../models/Job";

// Create a job
export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newJob = await Job.create({
      ...req.body,
      createdBy: req.user?.id,
    });

    res.status(201).json({ success: true, data: newJob });
  } catch (err) {
    next(err);
  }
};

// Get all jobs with filters
export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { location, jobType, title } = req.query;
    let query: any = {};

    if (location) query.location = { $regex: location, $options: "i" };
    if (jobType) query.jobType = jobType;
    if (title) query.title = { $regex: title, $options: "i" };

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
};

// Get single job
export const getJobById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};


// Update job
export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user?.id },
      req.body,
      { new: true }
    );

    if (!job) return res.status(404).json({ success: false, error: "Job not found or not authorized" });

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// Delete job
export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user?.id,
    });

    if (!job) return res.status(404).json({ success: false, error: "Job not found or not authorized" });

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};
