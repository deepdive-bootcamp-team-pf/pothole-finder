
import { Request, Response} from 'express'
import {selectAllPotholes} from '../../utils/pothole/selectAllPotholes'
import {selectPotholeByPotholeId} from '../../utils/pothole/selectPotholeByPotholeId'
import {insertPothole} from '../../utils/pothole/insertPothole'
import {Pothole} from '../../utils/interfaces/Pothole'
import {selectPotholesByPotholeProfileId} from "../../utils/pothole/selectPotholesByPotholeProfileId"
import {removePothole} from "../../utils/pothole/removePothole"
import {Profile} from "../../utils/interfaces/Profile"
import {Status} from "../../utils/interfaces/Status";

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

export async function postPotholeController(request: Request, response: Response) : Promise<Response> {
    try {
        const {potholeDescription, potholeSeverity} = request.body
        const profile: Profile = request.session.profile as Profile
        const potholeProfileId: string = profile.profileId as string

        const pothole: Pothole = {
            potholeId: null,
            potholeProfileId,
            potholeDescription,
            potholeDate: null,
            potholeLng: undefined,
            potholeLat: undefined,
            potholeSeverity
        }

        const result = await insertPothole(pothole)
        const status: Status = {
            status: 200,
            message: result,
            data: null
        }
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: 'Error creating pothole. Please try again.',
            data: null
        })
    }
}

export async function deletePotholeController(request: Request, response: Response) : Promise<Response>  {
    try {
        const pothole = request.body
        const result = await removePothole(pothole)
        return response.json({status: 200, data: null, result})
    } catch (error) {
        return response.json({pothole: 500, data: null, message: 'Server error deleting pothole. Please try again.'})
    }
}