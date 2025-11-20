import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
export const uploadCloudinary = async (filepath) => {
  try {
    if (!filepath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    throw error;
  } finally {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
};
export const deleteCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteMultipleCloudinary = async (publicIds) => {
  try {
    const response = await cloudinary.api.delete_resources(publicIds);
    return response;
  } catch (error) {
    throw error;
  }
};

