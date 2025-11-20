import { customError } from "../utils/customeError.util.js";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.statuscode).json({
      statusCode: err.statuscode,
      message: err.message,
    });
  }
  return res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
  });
};
