import { Request, Response} from 'express'
import {selectAllPhotos} from '../../utils/photo/selectAllPhotos'
import {selectPhotoByPhotoId} from '../../utils/photo/selectPhotoByPhotoId'

export async function getAllPhotosCController(request: Request, response: Response) : Promise<Response> {
    try {
        const data = await selectAllPhotos()
        return response.json({status:200, data, message:null})
    } catch (error) {
        return response.json({status:500, data:null, message: 'Server error. Please try again.'})
    }
}

export async function getPhotoByPhotoIdController(request: Request, response: Response) : Promise<Response> {
    try {
        const {photoId} = request.params
        const data = await selectPhotoByPhotoId(photoId)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return reponse.json({status: 500, data: null, message: 'Server error. Please try again.'})
    }
}

export async function postPhotoController(request: Request, response: Response) : Promise<Response> {
    try {
        const {}
    }
}

