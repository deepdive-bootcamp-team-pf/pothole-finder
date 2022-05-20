import { Router } from 'express'
import {
        // postPotholeVerificationController,
        // deletePotholeVerificationController,
        getAllPotholeVerificationController,
        getPotholeVerificationByPotholeVerificationPotholeIdController,
        getPotholeVerificationByPotholeVerificationProfileIdController } from './pothole-verification.controller'
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller'
import { check, checkSchema } from 'express-validator'
import { potholeVerificationValidator } from "./pothole-verification.validator"

export const potholeVerificationRoute = Router()

potholeVerificationRoute.route('/')
    .get(getAllPotholeVerificationController)
    // .post(asyncValidatorController(checkSchema(potholeVerificationValidator)), postPotholeVerificationController)

potholeVerificationRoute.route('/pv-potholeId/:potholeVerificationPotholeId')
    .get(asyncValidatorController([check('potholeVerificationPotholeId', 'Enter a valid pothole ID for the pothole verification.').isUUID()]), getPotholeVerificationByPotholeVerificationPotholeIdController)
    // .delete(asyncValidatorController([check('potholeVerificationPotholeId', 'Enter a valid pothole ID for the pothole verification.').isUUID()]), deletePotholeVerificationController)

potholeVerificationRoute.route('/pv-profileId/:potholeVerificationProfileId')
    .get(asyncValidatorController([check('potholeVerificationProfileId', 'Enter a valid profile ID for the pothole verification.').isUUID()]), getPotholeVerificationByPotholeVerificationProfileIdController)
    // .delete(asyncValidatorController([check('potholeVerificationProfileId', 'Enter a valid profile ID for the pothole verification.').isUUID()]), deletePotholeVerificationController)