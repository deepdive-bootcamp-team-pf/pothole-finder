import { Schema } from 'express-validator'

export const photoValidator: Schema = {

    photoDate: {
        toDate: true
    },

    photoDescription: {
        isLength: {
            errorMessage: 'A description must be between 1 and 512 characters.',
            options: {min: 1, max: 512}
        },
        trim: true,
        escape: true,
        optional: {
            options: {
                nullable: true
            }
        }
    },

    photoName: {
        isLength: {
            errorMessage: 'Name must be between 1 and 32 characters.',
            options: {min: 1, max: 32}
        }
    },

    photoURL: {
        isURL: {
            errorMessage: 'Photo is malformed. Please upload a new photo.'
        }
    }
}