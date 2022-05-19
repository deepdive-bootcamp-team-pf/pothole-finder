
import {Schema} from 'express-validator'

export const potholeValidator: Schema = {
    potholeId: {
        isUUID: {
            errorMessage: "Not a valid pothole ID."
        }
    },
    potholeProfileId: {
        isUUID: {
            errorMessage: "Not a valid pothole profile ID."
        }
    },
    potholeDate: {
        toDate: true,
        isDate: {
            errorMessage: "Not a valid pothole date."
        }
    },
    potholeDescription: {
        isString: true,
        is {
            errorMessage: "Please add a description."
        }
    },

    potholeLat: {
        isString: true,
            errorMessage: "Please add a latitude."
    },
    potholeLng: {
        isString: true,
            errorMessage: "Please add a longitude."
    },
    potholeSeverity: {
        isString: true,
            errorMessage: "Please indicate a severity"
    }
}