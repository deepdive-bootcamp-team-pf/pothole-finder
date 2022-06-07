import { Request, Response} from 'express'
import {selectAllPhotos} from '../../utils/photo/selectAllPhotos'
import {selectPhotoByPhotoId} from '../../utils/photo/selectPhotoByPhotoId'
import {insertPhoto} from '../../utils/photo/insertPhoto'
import {Photo} from '../../utils/interfaces/Photo'
import {selectPhotosByPhotoProfileId} from "../../utils/photo/selectPhotosByPhotoProfileId";
import {removePhoto} from "../../utils/photo/removePhoto";
import {Profile} from "../../utils/interfaces/Profile";
import {updatePhoto} from "../../utils/photo/updatePhoto";
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

export async function getPhotoByPhotoProfileIdController(request: Request, response: Response) : Promise<Response> {
    try {
        const {photoProfileId } = request.params
        const data = await selectPhotosByPhotoProfileId(photoProfileId)
        return response.json({status: 200, message: null, data})
    } catch(error) {
        return response.json({status: 500, message: '', data: []})
    }
}

export async function postPhotoController(request: Request, response: Response) : Promise<Response> {
    try {
        const {photoPotholeId, photoDescription, photoName, photoURL} = request.body
        const profile: Profile = request.session.profile as Profile
        const photoProfileId = profile.profileId
        const photo: Photo = {
            photoId: null,
            photoPotholeId,
            photoProfileId,
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

export async function deletePhotoController(request: Request, response: Response) : Promise<Response>  {
    try {
        const {photoId} = request.params
        // @ts-ignore
        const photoIdFromSession = request.session.profile.profileId as string
        const targetedPhoto = await selectPhotoByPhotoId(photoId)
        return (targetedPhoto !== null) && targetedPhoto.photoProfileId as string === photoIdFromSession ? deleteSucceeded(response, targetedPhoto): deleteFailed(response)
    } catch (error) {
        return response.json({photo: 500, data: null, message: 'Error deleting photo. Please try again.'})
    }
}

function deleteFailed (response: Response): Response {
    return response.json({status: 400, message: 'Input incorrect or you do not have permission to delete this photo.', data: null})
}

function deleteSucceeded (response: Response, photo: Photo): Response {
    const {photoId, photoPotholeId, photoProfileId, photoDate, photoDescription, photoName, photoURL} = photo
    const targetPhoto: Photo = {
        photoId,
        photoPotholeId,
        photoProfileId,
        photoDate,
        photoDescription,
        photoName,
        photoURL
    }
    removePhoto(targetPhoto)
    return response.json({status: 200, message: 'Photo deleted.', data:null})
}

export async function putPhotoController(request: Request, response: Response): Promise<Response> {
    try {
        const {photoId} = request.params
        const {photoDescription, photoName, photoURL} = request.body
        console.log("hello")
        const targetedPhoto = await selectPhotoByPhotoId(photoId)
        console.log(targetedPhoto)
        const photoPotholeId = targetedPhoto?.photoPotholeId
        // @ts-ignore
        const profile = request.session.profile as Profile
        const photoProfileId = profile.profileId as string

        const performUpdate = async (photo: Photo): Promise<Response> => {
            // @ts-ignore
            const previousPhoto: Photo = await selectPhotoByPhotoId(photoId)
            const newPhoto: Photo = {...previousPhoto, ...photo}
            await updatePhoto(newPhoto)
            return response.json({status: 200, message: 'Photo updated.', data: null})
        }

        const updateFailed = (message: string): Response => {
            return response.json({ status: 400, data: null, message })
        }

        // @ts-ignore
        return(targetedPhoto !== null) && targetedPhoto.photoProfileId === photoProfileId ? await performUpdate({photoPotholeId, photoDescription, photoDate: null, photoName, photoURL}) : updateFailed('Please login to update pothole.')
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server cannot reach pothole, try again later.',
            data: null
        })
    }
}