import { Schema } from 'express-validator'

export const logInValidator: Schema = {
    profilePassword: {
        isLength: {
            errorMessage: 'Password must be at least eight characters',
            options: { min: 8 }
        },
        trim: true,
        escape: true,
    },
    profileUsername: {
        escape: true,
        trim: true,
        notEmpty: {
            errorMessage: 'Profile must have a username.'
        }
    }
}