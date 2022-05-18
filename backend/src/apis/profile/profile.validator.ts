import { Schema } from 'express-validator'

export const profileValidator: Schema = {
    profileId: {
        isUUID: {
            errorMessage: 'Not a valid profile ID.'
        }
    },
    profileAuthenticationToken: {
        isUUID: {
            errorMessage: 'Not a valid profile authentication token.'
        }
    },
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
    profileHash: {
        escape: true,
        isLength: {
            errorMessage: 'Hash must be 97 characters long.'
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