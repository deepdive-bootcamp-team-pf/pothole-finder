import {Schema} from 'express-validator'

export const potholeVerificationValidator: Schema = {
    potholeVerificationPotholeId: {
        isUUID: {
            errorMessage: "Not a valid pothole verification pothole ID."
        }
    },
    potholeVerificationProfileId: {
        isUUID: {
            errorMessage: "Not a valid pothole verification profile ID."
        }
    },
    potholeVerificationDate: {
        toDate: true,
        isDate: {
            errorMessage: "Not a valid pothole verification date."
        }
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
