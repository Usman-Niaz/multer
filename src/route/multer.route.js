import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  handleUpload,
  handleDelete,
  handleMultipleUpload,
  handleMultipleDelete,
} from "../controller/fileUpload.js";
import { jwtMiddleware } from "../middleware/jwt.middleware.js";
import { asyncWrapper } from "../middleware/asyncWrapper.middleware.js";
const router = express.Router();
router.post(
  "/upload-file",
  jwtMiddleware,
  upload.single("file"),
  asyncWrapper(handleUpload)
);
router.post(
  "/upload-multiple-files",
  jwtMiddleware,
  upload.array("files", 10),
  asyncWrapper(handleMultipleUpload)
);
router.post(
  "/delete-multiple-files",
  jwtMiddleware,
  asyncWrapper(handleMultipleDelete)
);
router.post("/delete-file", jwtMiddleware, asyncWrapper(handleDelete));
export default router;
