import { Schema } from "express-validator";

export const potholeVerificationValidator: Schema = {
  potholeVerificationDate: {
    toDate: true,
  },
};
