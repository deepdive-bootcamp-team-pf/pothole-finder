import { Router } from 'express'
import { signOutController } from './sign-out.controller'

export const signOutRoute: Router = Router()

signOutRoute.route('/')
  .get(signOutController)
