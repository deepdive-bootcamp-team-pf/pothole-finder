import { Request, Response } from 'express'
import { PartialProfile, Profile } from '../../utils/interfaces/Profile'
import { removeProfile } from '../../utils/profile/removeProfile'
import { selectAllProfiles } from '../../utils/profile/selectAllProfiles'
import { selectProfileByProfileId } from '../../utils/profile/selectProfileByProfileId'
import { selectProfileByProfileEmail} from '../../utils/profile/selectProfileByProfileEmail'
import { updateProfile } from '../../utils/profile/updateProfile'
import {setHash} from "../../utils/auth.utils"
import { Status} from "../../utils/interfaces/Status";

export async function deleteProfileController(request: Request, response: Response): Promise<Response> {
    try {
        const { profileEmail } = request.body

        const profile: Profile = {
            profileId: 'f21400c6-d800-11ec-ba38-0242ac1a0002',
            profileAuthenticationToken: null,
            profileEmail,
            profileFirstName: '',
            profileHash: '',
            profileLastName: '',
            profileUsername: ''
        }

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
        // const { profileId } = request.params
        const { profileEmail, profileFirstName, profileLastName, profilePassword, profileUsername } = request.body
        const profileHash = await setHash(profilePassword)

        const profile: Profile = {
            profileId: 'f21400c6-d800-11ec-ba38-0242ac1a0002',
            profileAuthenticationToken: null,
            profileEmail,
            profileFirstName,
            profileLastName,
            profileHash,
            profileUsername
        }

        const result = await updateProfile(profile)
        return response.json({status: 200, data: null, result})


        // const profile = request.body.profile as Profile
        // const profileIdFromSession = profile.profileId as string

        // const performUpdate = async (partialProfile: PartialProfile): Promise<Response> => {
        //     const previousProfile: Profile = await selectProfileByProfileId(partialProfile.profileId as string) as Profile
        //     const newProfile: Profile = {...previousProfile, ...partialProfile}
        //     const result = await updateProfile(newProfile)
        //     return response.json({status: 200, data: null, result})
        // }
        //
        // const updateFailed = (message: string): Response => {
        //     return response.json({status: 400, data: null, message})
        // }
        //
        // return profileId === profileIdFromSession ?
        //     await performUpdate({profileId, profileEmail, profileFirstName, profileLastName, profileHash, profileUsername}) :
        //     updateFailed('Cannot perform profile update.')
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server cannot reach profile, try again later.',
            data: null
        })
    }
}