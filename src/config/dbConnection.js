import mongoose from "mongoose";
export function dbConnection(uri) {
  return mongoose.connect(uri);
}
