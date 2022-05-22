import { Router } from 'express'
import {
    postPotholeController,
    deletePotholeController,
    getAllPotholesController,
    getPotholeByPotholeIdController,
    getPotholesByPotholeProfileIdController
} from './pothole.controller'

import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller'
import { check, checkSchema } from 'express-validator'
import { potholeValidator } from './pothole.validator'

export const potholeRoute = Router()

potholeRoute.route('/')
    .get(getAllPotholesController)
    .post(asyncValidatorController(checkSchema(potholeValidator)), postPotholeController)

potholeRoute.route('/potholeProfileId/:potholeProfileId')
    .get(asyncValidatorController([check('potholeProfileId','Enter a valid profile ID for pothole').isUUID()]), getPotholesByPotholeProfileIdController)
    .delete(asyncValidatorController([check('potholeProfileId', 'Enter a valid profile ID for pothole').isUUID()]), deletePotholeController)

potholeRoute.route('/:potholeId')
    .get(asyncValidatorController([check('potholeId','Enter a valid pothole ID').isUUID()]), getPotholeByPotholeIdController)
    .delete(asyncValidatorController([check('potholeId', 'Enter a valid pothole ID').isUUID()]), deletePotholeController)

potholeRoute.route('/')
    .get(getAllPotholesController)
    .post(postPotholeController)