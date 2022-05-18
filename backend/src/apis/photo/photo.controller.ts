import { Request, Response} from 'express'
import {selectAllPhotos} from '../../utils/photo/selectAllPhotos'
import {selectPhotoByPhotoId} from '../../utils/photo/selectPhotoByPhotoId'
import {insertPhoto} from "../../utils/photo/insertPhoto";
import {photoValidator} from "./photo.validator";
import {Photo} from "../../utils/interfaces/Photo";

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
        return response.json({status: 500, data: null, message: 'Server error. Please try again.'})
    }
}

export async function postPhotoController(request: Request, response: Response) : Promise<Response> {
    try {
        const {photoDescription, photoName, photoURL} = request.body
        const photo: Photo = {
            photoId: null,
            photoPotholeId: null,
            photoProfileId: null,
            photoDate: null,
            photoDescription,
            photoName,
            photoURL
        }
        const message = await insertPhoto(photo)
        return response.json({status: 200, data: null, message})
    } catch (error) {
        return response.json({photo: 500, data: null, message: 'Server error. Please try again.'})
    }
}

