import { Request, Response } from 'express'
import { Profile } from '../../utils/interfaces/Profile'
import { removeProfile } from '../../utils/profile/removeProfile'
import { selectAllProfiles } from '../../utils/profile/selectAllProfiles'
import { selectProfileByProfileId } from '../../utils/profile/selectProfileByProfileId'
import { selectProfileByProfileEmail} from '../../utils/profile/selectProfileByProfileEmail'
import { updateProfile } from '../../utils/profile/updateProfile'
import {setHash} from "../../utils/auth.utils";

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
        const data = await selectAllProfiles()

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

export async function getProfileByProfileEmailController(request: Request, response: Response): Promise<Response> {
    try {
        const { profileEmail } = request.params
        const data = await selectProfileByProfileEmail(profileEmail)
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
        const {profileEmail, profileFirstName, profileLastName, profilePassword, profileUsername} = request.body

        const profileHash = await setHash(profilePassword)

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