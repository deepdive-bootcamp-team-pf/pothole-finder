import { Router } from 'express'
import { check, checkSchema } from 'express-validator'
import {
        togglePotholeVerificationController,
        getAllPotholeVerificationController,
        getPotholeVerificationByPotholeVerificationProfileIdController,
        getPotholeVerificationByPotholeVerificationPotholeIdController
} from './pothole-verification.controller'
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller'
import { isLoggedIn } from '../../utils/controllers/isLoggedIn.controller'
import { potholeVerificationValidator } from "./pothole-verification.validator"

export const potholeVerificationRoute = Router()

potholeVerificationRoute.route('/')
    .get(getAllPotholeVerificationController)
    .post(isLoggedIn, asyncValidatorController(checkSchema(potholeVerificationValidator)), togglePotholeVerificationController)

potholeVerificationRoute.route('/PVProf/:potholeVerificationProfileId')
    .get(asyncValidatorController([check('potholeVerificationProfileId', 'Enter a valid profile ID for the pothole verifications.').isUUID()]), getPotholeVerificationByPotholeVerificationProfileIdController)

potholeVerificationRoute.route('/PVPot/:potholeVerificationPotholeId')
    .get(asyncValidatorController([check('potholeVerificationPotholeId', 'Enter a valid pothole ID for the pothole verifications.').isUUID()]), getPotholeVerificationByPotholeVerificationPotholeIdController)