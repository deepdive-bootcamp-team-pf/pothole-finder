import { Router } from 'express'
import {postProfileController,
        deleteProfileController,
        getAllProfileController,
        getProfileByProfileIdController,
        putProfileController} from './profile.controller'
import { check } from 'express-validator'

export const profileRoute = Router()

profileRoute.route('/:profileId').get

profileRoute.route('/')