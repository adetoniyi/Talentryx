import cloudinary from "../config/cloudinary";

export const uploadFile = async (filePath: string, folder: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

export const deleteFile = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Cloudinary deletion failed");
  }
};
