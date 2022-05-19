import { Router } from 'express'
import { signupProfileController } from './sign-up.controller'
import { asyncValidatorController} from '../../utils/controllers/asyncValidator.controller'
import { check, checkSchema } from 'express-validator'
import { signupValidator } from './sign-up.validator'
import {activationController} from "./activation.controller";

export const signupRoute = Router()

signupRoute.route('/').post(asyncValidatorController(checkSchema(signupValidator)), signupProfileController)

signupRoute.route('/activation/:activation').get(asyncValidatorController([check('activation', 'invalid activation link').isHexadecimal().notEmpty()]), activationController)

export default signupRoute