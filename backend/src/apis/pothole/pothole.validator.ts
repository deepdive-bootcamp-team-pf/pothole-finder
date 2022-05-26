
import {Schema} from 'express-validator'

export const potholeValidator: Schema = {
    potholeId: {
        isUUID: {
            errorMessage: "Not a valid potholeId."
        }
    },
    potholeProfileId: {
        isUUID: {
            errorMessage: "Not a valid pothole profile ID."
        }
    },
    potholeDate: {
        toDate: true
    },
    potholeDescription: {
        isLength: {
            errorMessage: "Please add a description.",
            options: {
                min: 1,
                max: 255
            }
        },
        trim: true,
        escape: true,
        optional: {
            options: {
                nullable: true
            }
        }
    },


    potholeLat: {
        isDecimal: {
            options: {
                force_decimal: true,
            },
            errorMessage: "Please add a latitude."
        }
    },



    potholeLng: {
        isDecimal: {
            options: {
                force_decimal: true,
            },
            errorMessage: "Please add a latitude."
        }
    },
    potholeSeverity: {
        isLength: {
            errorMessage: "Please add a severity.",
            options: {
                min: 1,
                max: 255
            }
        },
        trim: true,
        escape: true
    }
}