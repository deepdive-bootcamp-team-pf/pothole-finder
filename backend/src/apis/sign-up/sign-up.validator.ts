import { Schema } from 'express-validator'

export const signupValidator: Schema = {
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
    profilePassword: {
        escape: true,
        trim: true,
        isLength: {
            errorMessage: 'Password must be at least eight characters long.',
            options: {min: 8}
        }
    },
    profilePasswordConfirm: {
        escape: true,
        trim: true,
        isLength: {
            errorMessage: 'Confirm password must match the password.',
            options: {min: 8}
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