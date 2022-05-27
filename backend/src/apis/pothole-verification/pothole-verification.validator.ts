import {Schema} from 'express-validator'

export const potholeVerificationValidator: Schema = {
    potholeVerificationDate: {
        toDate: true,
    },
    potholeVerificationPhotoURL: {
        optional: {
            options: {
                nullable: true
            }
        },
        isURL: {
            errorMessage: "URL image is malformed, please upload a new photo."
        }
    }
}
