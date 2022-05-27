import { Schema } from 'express-validator'

export const profileValidator: Schema = {
    profileEmail: {
        isEmail: {
            errorMessage: 'Not a valid email address.'
        }
    },
    profileFirstName: {
        escape: true,
        trim: true,
        notEmpty: {
            errorMessage: 'First name cannot be empty.'
        }
    },
    profileLastName: {
        escape: true,
        trim: true,
        notEmpty: {
            errorMessage: 'Last name cannot be empty.'
        }
    },
    profileUsername: {
        escape: true,
        trim: true,
        notEmpty: {
            errorMessage: 'Profile must have a username.'
        }
    }
}