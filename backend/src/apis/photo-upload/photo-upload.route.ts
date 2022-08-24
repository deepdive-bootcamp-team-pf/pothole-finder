import { Router } from "express";
import { photoUploader } from "./multer.controller";
import { photoUploadController } from "./photo-upload.controller";

export const ImageUploadRouter = Router();

ImageUploadRouter.route("/").post(photoUploader, photoUploadController);
