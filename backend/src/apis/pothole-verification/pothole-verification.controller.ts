import { Request, Response } from 'express'
import 'express-session'
import { PotholeVerification } from '../../utils/interfaces/PotholeVerification'
import { Profile } from "../../utils/interfaces/Profile";
import { insertPotholeVerification } from '../../utils/potholeVerification/insertPotholeVerification'
import { removePotholeVerification } from '../../utils/potholeVerification/removePotholeVerification'
import { selectAllPotholeVerifications } from '../../utils/potholeVerification/selectAllPotholeVerifications'
import { selectPotholeVerificationByPotholeVerificationId } from '../../utils/potholeVerification/selectPotholeVerificationByPotholeVerificationId'
import { selectPotholeVerificationsByPotholeVerificationProfileId } from '../../utils/potholeVerification/selectPotholeVerificationsByPotholeVerificationProfileId'
import { selectPotholeVerificationsByPotholeVerificationPotholeId } from '../../utils/potholeVerification/selectPotholeVerificationsByPotholeVerificationPotholeId'

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

export async function togglePotholeVerificationController (request: Request, response: Response): Promise<Response<string>> {
    try {
        const { potholeVerificationPotholeId } = request.body
        // @ts-ignore
        const profile = request.session.profile as Profile
        const potholeVerificationProfileId = profile.profileId as string

        const potholeVerification: PotholeVerification = {
            potholeVerificationPotholeId,
            potholeVerificationProfileId,
            potholeVerificationDate: null,
        }

        let result

        const selectedPotholeVerification: PotholeVerification|null = await selectPotholeVerificationByPotholeVerificationId(potholeVerification)
        if (selectedPotholeVerification === null) {
            result = await insertPotholeVerification(potholeVerification)
        } else {
            result = await removePotholeVerification(potholeVerification)
        }
        return response.json({status: 200, result, data: null})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error verifying pothole, try again later.',
            data: null
        })
    }
}