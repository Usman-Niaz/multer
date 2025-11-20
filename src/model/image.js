import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new Schema({
  imageUri: {
    type: String,
    required: true,
    trim: true,
  },
  publicId: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Image = model("Image", imageSchema);
