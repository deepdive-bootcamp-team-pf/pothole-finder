import { Schema } from 'express-validator'

export const photoValidator: Schema = {
    photoId: {
        isUUID: {
            errorMessage: 'Please provide a valid photoId.'
        }
    },
    photoPotholeId: {
        isUUID: {
            errorMessage: 'Please provide a valid photoPotholeId.'
        }
    },
    photoProfileId: {
        isUUID: {
            errorMessage: 'Please provide a valid photoProfileId.'
        }
    },
    photoDate: {
        toDate: true
    },
    photoDescription: {
        isLength: {
            errorMessage: 'A description must be between 1 and 512 characters.',
            options: {min: 1, max: 512}
        },
        trim: true,
        escape: true
    },
    photoName: {
        isLength: {
            errorMessage: 'Name must be '
        }
    },
    photoURL: {
        isURL: {
            errorMessage: 'Photo is malformed. Please upload a new photo.'
        }
    }
}