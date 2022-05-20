import { Router } from 'express'
import {asyncValidatorController} from '../utils/controllers/asyncValidator.controller'
import  {logInValidator} from './log-in.validator'
import {logInController, getProfileByProfileEmail} from './log-in.controller'
import {checkSchema, check} from 'express-validator'


export const logInRoute: Router = Router()

logInRoute.route('/')
    .post(asyncValidatorController(checkSchema(logInValidator)), logInController)

logInRoute.route('/:profileEmail')
    .get(asyncValidatorController([check('profileEmail', 'Test message')]), getProfileByProfileEmail)