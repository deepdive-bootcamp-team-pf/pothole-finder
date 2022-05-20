import { Request, Response } from 'express'
import { PotholeVerification } from '../../utils/interfaces/PotholeVerification'
import { Profile } from "../../utils/interfaces/Profile";
import { insertPotholeVerification } from '../../utils/potholeVerification/insertPotholeVerification'
import { removePotholeVerification } from '../../utils/potholeVerification/removePotholeVerification'
import { selectAllPotholeVerifications } from '../../utils/potholeVerification/selectAllPotholeVerifications'
import { selectPotholeVerificationsByPotholeVerificationPotholeId } from '../../utils/potholeVerification/selectPotholeVerificationsByPotholeVerificationPotholeId'
import { selectPotholeVerificationsByPotholeVerificationProfileId } from '../../utils/potholeVerification/selectPotholeVerificationsByPotholeVerificationProfileId'

// will test post function after project is synced with Pothole entity and associated navigable routes

// export async function postPotholeVerificationController(request: Request, response: Response): Promise<Response> {
//     try {
//         const {potholeVerificationPhotoURL} = request.body
//         const pothole: Pothole = request.session.pothole as Pothole
//         const potholeVerificationPotholeId: string = pothole.potholeId as string
//         const profile: Profile = request.session.profile as Profile
//         const potholeVerificationProfileId: string = profile.profileId as string
//
//         const potholeVerification: PotholeVerification = {
//             potholeVerificationPotholeId,
//             potholeVerificationProfileId,
//             potholeVerificationDate: null,
//             potholeVerificationPhotoURL
//         }
//         const result = await insertPotholeVerification(potholeVerification)
//         return response.json({status: 200, data: null, result})
//     } catch (e) {
//         return response.json({
//             status: 500,
//             message: 'Server error verifying pothole, try again later.',
//             data: null
//         })
//     }
// }

export async function deletePotholeVerificationController(request: Request, response: Response): Promise<Response> {
    try {
        const potholeVerification = request.body

        const result = await removePotholeVerification(potholeVerification)
        return response.json({status: 200, data: null, result})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error verifying pothole, try again later.',
            data: null
        })
    }
}

export async function getAllPotholeVerificationController(request: Request, response: Response): Promise<Response> {
    try {
        const data = await selectAllPotholeVerifications()

        return response.json({status: 200, message: null, data})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error verifying pothole, try again later.',
            data: null
        })
    }
}

export async function getPotholeVerificationByPotholeVerificationPotholeIdController(request: Request, response: Response): Promise<Response> {
    try {
        const { potholeVerificationPotholeId } = request.params
        const data = await selectPotholeVerificationsByPotholeVerificationPotholeId(potholeVerificationPotholeId)
        return response.json({status: 200, message: null, data})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error verifying pothole, try again later.',
            data: null
        })
    }
}

export async function getPotholeVerificationByPotholeVerificationProfileIdController(request: Request, response: Response): Promise<Response> {
    try {
        const { potholeVerificationProfileId } = request.params
        const data = await selectPotholeVerificationsByPotholeVerificationProfileId(potholeVerificationProfileId)
        return response.json({status: 200, message: null, data})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error verifying pothole, try again later.',
            data: null
        })
    }
}