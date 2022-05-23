import { Router } from 'express'
import { deleteProfileController,
        getAllProfileController,
        getProfileByProfileIdController,
        putProfileController } from './profile.controller'
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller'
import { isLoggedIn } from '../../utils/controllers/isLoggedIn.controller'
import { check, checkSchema } from 'express-validator'
import { profileValidator } from './profile.validator'

export const profileRoute = Router()

profileRoute.route('/')
    .get(getAllProfileController)

profileRoute.route('/:profileId')
    .get(asyncValidatorController([check('profileId', 'Enter a valid profile ID').isUUID()]), getProfileByProfileIdController)
    .delete(isLoggedIn, asyncValidatorController([check('profileId', 'Enter a valid profile').isUUID()]), deleteProfileController)
    .put(isLoggedIn, asyncValidatorController(checkSchema(profileValidator)), putProfileController)