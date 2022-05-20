import { Router } from 'express'
import {asyncValidatorController} from '../../utils/controllers/asyncValidator.controller'
import  {logInValidator} from './log-in.validator'
import {logInController} from './log-in.controller'
import {checkSchema} from 'express-validator'

export const logInRouter: Router = Router()

logInRouter.route('/')
    .post(asyncValidatorController(checkSchema(logInValidator)), logInController)