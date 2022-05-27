import { Request, Response} from 'express'
import 'express-session'
import {selectAllPotholes} from '../../utils/pothole/selectAllPotholes'
import {selectPotholeByPotholeId} from '../../utils/pothole/selectPotholeByPotholeId'
import {insertPothole} from '../../utils/pothole/insertPothole'
import {Pothole} from '../../utils/interfaces/Pothole'
import {selectPotholesByPotholeProfileId} from "../../utils/pothole/selectPotholesByPotholeProfileId"
import {removePothole} from "../../utils/pothole/removePothole"
import {Status} from "../../utils/interfaces/Status";
import {updatePothole} from "../../utils/pothole/updatePothole";
import {Profile} from '../../utils/interfaces/Profile'

export async function getAllPotholesController(request: Request, response: Response) : Promise<Response> {
    try {
        const data = await selectAllPotholes()
        return response.json({status:200, data, message:null})
    } catch (error) {
        return response.json({status:500, data:null, message: 'Server error. Please try again.'})
    }
}

export async function getPotholeByPotholeIdController(request: Request, response: Response) : Promise<Response> {
    try {
        const {potholeId} = request.params
        const data = await selectPotholeByPotholeId(potholeId)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json({status: 500, data: null, message: 'Server error. Please try again.'})
    }
}

export async function getPotholesByPotholeProfileIdController(request: Request, response: Response) : Promise<Response> {
    try {
        const {potholeProfileId } = request.params
        const data = await selectPotholesByPotholeProfileId(potholeProfileId)
        return response.json({status: 200, message: null, data})
    } catch(error) {
        return response.json({status: 500, message: '', data: []})
    }
}

export async function postPotholeController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const { potholeSeverity, potholeDescription, potholeLat, potholeLng } = request.body
        // @ts-ignore
        const profile = request.session.profile as Profile
        const potholeProfileId = profile.profileId as string

        const pothole: Pothole = {
            potholeId: null,
            potholeProfileId,
            potholeSeverity,
            potholeDate: null,
            potholeDescription,
            potholeLat,
            potholeLng
        }
        await insertPothole(pothole)

        return response.json({status:200, message: 'Pothole created successfully.', data:null})
    } catch (error) {
        return response.json({
            status: 500,
            message: 'Error Creating pothole, please try again later.',
            data: null
        })
    }
}

export async function deletePotholeController(request: Request, response: Response) : Promise<Response>  {
    try {
        const {potholeId} = request.params
        // @ts-ignore
        const profileIdFromSession = request.session.profile.profileId as string
        const targetedPothole = await selectPotholeByPotholeId(potholeId)
// console.log('targetedPotholeProfileId',targetedPothole?.potholeProfileId)
//         console.log('this will be session profileId', profileIdFromSession)
        return (targetedPothole !== null) && targetedPothole.potholeProfileId as string === profileIdFromSession ? deleteSucceeded(response, targetedPothole): deleteFailed(response)
    }catch (error) {
        return response.json({photo: 500, data: null, message: 'Error deleting pothole. Please try again.'})
    }
}
function deleteFailed (response: Response): Response {
    return response.json({status: 400, message: 'Input incorrect or you do not have permission to delete this pothole.', data: null})
}

function deleteSucceeded (response: Response, pothole: Pothole): Response {
    const {potholeId, potholeProfileId, potholeDescription, potholeDate, potholeSeverity, potholeLat, potholeLng} = pothole
    const targetPothole: Pothole = {
        potholeId,
        potholeProfileId,
        potholeDescription,
        potholeDate,
        potholeSeverity,
        potholeLat,
        potholeLng
    }
    removePothole(targetPothole)
    return response.json({status: 200, message: 'Pothole deleted.', data: null})
}

export async function putPotholeController(request: Request, response: Response): Promise<Response> {
    try {
        const {potholeId} = request.params
        const {potholeSeverity, potholeDescription, potholeLat, potholeLng} = request.body
        const targetedPothole = await selectPotholeByPotholeId(potholeId)
        // @ts-ignore
        const profile = request.session.profile as Profile
        const potholeProfileId = profile.profileId as string

        const performUpdate = async (pothole: Pothole): Promise<Response> => {
            // @ts-ignore
            const previousPothole: Pothole = await selectPotholeByPotholeId(potholeId)
            const newPothole: Pothole = {...previousPothole, ...pothole}
            await updatePothole(newPothole)
            return response.json({status: 200, message: 'Pothole updated.', data: null})
        }

        const updateFailed = (message: string): Response => {
            return response.json({ status: 400, data: null, message })
        }

        // @ts-ignore
        return(targetedPothole !== null) && targetedPothole.potholeProfileId === potholeProfileId ? await performUpdate({potholeSeverity, potholeDate: null, potholeDescription, potholeLat, potholeLng}) : updateFailed('Please login to update pothole.')
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server cannot reach pothole, try again later.',
            data: null
        })
    }
}














//inspect
// const result = await removePothole(pothole)
// return response.json({status: 200, data: null, result})

// export async function deleteProfileController(request: Request, response: Response): Promise<Response> {
//     try {
//         const {profileId} = request.params
//         const {profileEmail} = request.body
//         const loggedInProfile = await selectProfileByProfileEmail(profileEmail)
//
//         return (loggedInProfile !== null) && loggedInProfile.profileId === profileId ? deleteSucceeded(response, loggedInProfile) : deleteFailed(response)
//     } catch (e) {
//         return response.json({
//             status: 500,
//             message: 'Server error deleting profile. Sure you don\'t want to stay?',
//             data: null
//         })
//     }
// }

// const pothole: Pothole = {
//     potholeId,
//     potholeProfileId,
//     potholeDate: null,
//     potholeDescription: "",
//     potholeSeverity: "",
//     potholeLng: "",
//     potholeLat: ""
// }
