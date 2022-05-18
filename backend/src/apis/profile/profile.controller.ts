import { Request, Response } from 'express'
import { Profile } from '../../utils/interfaces/Profile'
import { insertProfile } from '../../utils/profile/insertProfile'
import { removeProfile } from '../../utils/profile/removeProfile'
import { selectAllProfile } from '../../utils/profile/selectAllProfile'
import { selectProfileByProfileId } from '../../utils/profile/selectProfileByProfileId'
import { updateProfile } from '../../utils/profile/updateProfile'

export async function postProfileController(request: Request, response: Response): Promise<Response> {
    try {
        const {profileEmail, profileFirstName, profileHash, profileLastName, profileUsername} = request.body

        const profile: Profile = {
            profileId: null,
            profileAuthenticationToken: null,
            profileEmail,
            profileFirstName,
            profileHash,
            profileLastName,
            profileUsername
        }
        const result = await insertProfile(profile)
        return response.json({status: 200, data: null, result})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error creating profile, try again later.',
            data: null
        })
    }
}

export async function deleteProfileController(request: Request, response: Response): Promise<Response> {
    try {
        const profile = request.body

        const result = await removeProfile(profile)
        return response.json({status: 200, data: null, result})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error deleting profile. Sure you don\'t want to stay?',
            data: null
        })
    }
}

export async function getAllProfileController(request: Request, response: Response) : Promise<Response> {
    try {
        const data = await selectAllProfile()

        return response.json({status: 200, message: null, data})
    } catch (e) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getProfileByProfileIdController(request: Request, response: Response): Promise<Response> {
    try {
        const { profileId } = request.params
        const data = await selectProfileByProfileId(profileId)
        return response.json({status: 200, message: null, data})
    } catch (e) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function putProfileController(request: Request, response: Response): Promise<Response> {
    try {
        const {profileEmail, profileFirstName, profileHash, profileLastName, profileUsername} = request.body

        const profile: Profile = {
            profileId: null,
            profileAuthenticationToken: null,
            profileEmail,
            profileFirstName,
            profileHash,
            profileLastName,
            profileUsername
        }
        const result = await updateProfile(profile)
        return response.json({status: 200, data: null, result})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error creating profile, try again later.',
            data: null
        })
    }
}