import { Router } from 'express'
import {photoUploadController} from "./photo-upload.controller";


export const ImageUploadRouter = Router()

ImageUploadRouter.route('/')
    .post(photoUploader, photoUploadController)