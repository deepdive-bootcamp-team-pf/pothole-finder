import { Router } from 'express'
import {getAllPhotosCController, getPhotoByPhotoIdController} from './photo.controller'
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {checkSchema} from "express-validator";
export const photoRoute = Router()

photoRoute.route('/')
    .get(getAllPhotosCController)
    .post(asyncValidatorController(checkSchema(photoValidator)), postPhotoController)
