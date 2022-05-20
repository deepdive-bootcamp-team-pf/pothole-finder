
import { Request, Response} from 'express'
import {selectAllPotholes} from '../../utils/pothole/selectAllPotholes'
import {selectPotholeByPotholeId} from '../../utils/pothole/selectPotholeByPotholeId'
import {insertPothole} from '../../utils/pothole/insertPothole'
import {Pothole} from '../../utils/interfaces/Pothole'
import {selectPotholesByPotholeProfileId} from "../../utils/pothole/selectPotholesByPotholeProfileId";
import {removePothole} from "../../utils/pothole/removePothole";

export async function getAllPotholesController(request: Request, response: Response) : Promise<Response> {
    try {
        const data = await selectAllPotholes()
        return response.json({status:200, data, message:null})
    } catch (error) {
        return response.json({status:500, data:null, message: 'Server error. Please try again.'})
    }
}

export async function getPotholesByPotholeIdController(request: Request, response: Response) : Promise<Response> {
    try {
        const {potholeId} = request.params
        const data = await selectPotholeByPotholeId(potholeId)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json({status: 500, data: null, message: 'Server error. Please try again.'})
    }
}

export async function getPotholeByPotholeProfileIdController(request: Request, response: Response) : Promise<Response> {
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
        const pothole: Pothole = {
            potholeId: null,
            potholeProfileId: null,
            potholeDescription,
            potholeDate: null,
            potholeLng: undefined,
            potholeLat: undefined,
            potholeSeverity
        }
        const message = await insertPothole(pothole)
        return response.json({status: 200, data: null, message})
    } catch (error) {
        return response.json({pothole: 500, data: null, message: 'Server error. Please try again.'})
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