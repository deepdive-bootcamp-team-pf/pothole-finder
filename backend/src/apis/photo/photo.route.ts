import { Router } from 'express'
import {
    deletePhotoController,
    getAllPhotosCController,
    getPhotoByPhotoIdController,
    getPhotoByPhotoProfileIdController,
    postPhotoController, putPhotoController
} from './photo.controller'
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {check, checkSchema} from "express-validator";
import {photoValidator} from "./photo.validator";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {potholeValidator} from "../pothole/pothole.validator";
import {putPotholeController} from "../pothole/pothole.controller";
export const photoRoute = Router()

photoRoute.route('/')
    .get(getAllPhotosCController)
    .post(asyncValidatorController(checkSchema(photoValidator)), postPhotoController)

photoRoute.route('/photoProfileId/:photoProfileId')
    .get(
        asyncValidatorController(
            [check('photoProfileId', 'Please provide a valid UUID')]
        ), getPhotoByPhotoProfileIdController
    )

photoRoute.route('/:photoId')
    .get(asyncValidatorController([check('photoId', 'Please provide a valid UUID').isUUID()]), getPhotoByPhotoIdController)
    .delete(isLoggedIn, asyncValidatorController([check('photoId', 'Please provide a valid photoId').isUUID()]), deletePhotoController)
    .put(isLoggedIn, asyncValidatorController(checkSchema(photoValidator)), putPhotoController)