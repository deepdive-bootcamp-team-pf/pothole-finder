import { Router } from 'express'
import {photoUploadController} from "./photo-upload.controller";
import { photoUploader } from './multer.controller'

export const ImageUploadRouter = Router()

ImageUploadRouter.route('/')
    .post(photoUploader, photoUploadController)