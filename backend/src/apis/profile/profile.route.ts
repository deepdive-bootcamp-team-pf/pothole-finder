import { Router } from 'express'
import {postProfileController,
        deleteProfileController,
        getAllProfileController,
        getProfileByProfileIdController,
        putProfileController} from './profile.controller'
import { asyncValidatorController } from "../../utils/controllers/asyncValidator.controller";
import { check } from 'express-validator'

export const profileRoute = Router()

profileRoute.route('/:profileId').get(asyncValidatorController([check('profileId', 'Enter a valid profile ID').isUUID()]), getProfileByProfileIdController).put(asyncValidatorController([check('profileId', 'Enter a valid profile ID').isUUID()]), putProfileController).delete(asyncValidatorController([check('profileId', 'Enter a valid profile').isUUID()]), deleteProfileController)

profileRoute.route('/').get(getAllProfileController).post(postProfileController)