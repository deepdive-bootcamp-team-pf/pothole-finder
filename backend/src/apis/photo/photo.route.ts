import { Router } from 'express'
import {getAllPhotosCController, getPhotoByPhotoIdController, postPhotoController} from './photo.controller'
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {check, checkSchema} from "express-validator";
import {photoValidator} from "./photo.validator";
export const photoRoute = Router()

photoRoute.route('/')
    .get(getAllPhotosCController)
    .post(asyncValidatorController(checkSchema(photoValidator)), postPhotoController)

photoRoute.route('/:photoId')
    .get(
        asyncValidatorController(
            [check('photoId', 'Please provide a valid UUID').isUUID()]
        ), getPhotoByPhotoIdController
    )