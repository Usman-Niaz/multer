import { uploadCloudinary, deleteCloudinary,deleteMultipleCloudinary } from "../utils/fileSave.js";
import { Image } from "../model/image.js";
import { badRequest } from "../utils/customeError.util.js";
export const handleUpload = async (req, res) => {
  if (!req.file) {
    throw new badRequest("File is required");
  }
  const filePath = req.file.path;
  const { url, public_id } = await uploadCloudinary(filePath);
  const newImage = await Image.create({
    imageUri: url,
    publicId: public_id,
  });
  return res.status(200).json({
    success: true,
    cloudinary_url: url,
    public_id,
    message: "File uploaded and saved to DB successfully",
  });
};
export const handleDelete = async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    throw new badRequest("publicId is required");
  }
  const image = await Image.findOne({ publicId });
  if (!image) {
    throw new notFound("Image not found in database");
  }
  const result = await deleteCloudinary(publicId);

  if (result.result !== "ok" && result.result !== "not found") {
    throw new badRequest("Failed to delete from Cloudinary");
  }
  await Image.deleteOne({ publicId });
  return res.status(200).json({
    success: true,
    message: "Image deleted successfully",
    deletedPublicId: publicId,
  });
};
export const handleMultipleUpload = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new badRequest("Files are required");
  }

  const uploadResults = [];

  for (const file of req.files) {
    const { path: filePath } = file;
    const { url, public_id } = await uploadCloudinary(filePath);

    const newImage = await Image.create({
      imageUri: url,
      publicId: public_id,
    });

    uploadResults.push({ url, public_id });
  }

  return res.status(200).json({
    success: true,
    uploadedFiles: uploadResults,
    message: "Files uploaded and saved to DB successfully",
  });
};
export const handleMultipleDelete = async (req, res) => {
  const { publicIds } = req.body;

  if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
    throw new badRequest("publicIds must be a non-empty array");
  }
  const images = await Image.find({ publicId: { $in: publicIds } });

  if (images.length === 0) {
    throw new notFound("No matching images found in DB");
  }
  const cloudResult = await deleteMultipleCloudinary(publicIds);
  await Image.deleteMany({ publicId: { $in: publicIds } });

  return res.status(200).json({
    success: true,
    message: "Multiple files deleted successfully",
    cloudinaryResponse: cloudResult
  });
};
