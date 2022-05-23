import {Request, Response} from 'express'
import 'express-session'
import {PartialProfile, Profile} from '../../utils/interfaces/Profile'
import {removeProfile} from '../../utils/profile/removeProfile'
import {selectAllProfiles} from '../../utils/profile/selectAllProfiles'
import {selectProfileByProfileId} from '../../utils/profile/selectProfileByProfileId'
import {selectProfileByProfileEmail} from '../../utils/profile/selectProfileByProfileEmail'
import {updateProfile} from '../../utils/profile/updateProfile'
import {setHash} from '../../utils/auth.utils'
import { profile } from 'console'

export async function deleteProfileController(request: Request, response: Response): Promise<Response> {
    try {
        const {profileId} = request.params
        const {profileEmail} = request.body
        const loggedInProfile = await selectProfileByProfileEmail(profileEmail)

        return (loggedInProfile !== null) && loggedInProfile.profileId === profileId ? deleteSucceeded(response, loggedInProfile) : deleteFailed(response)
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error deleting profile. Sure you don\'t want to stay?',
            data: null
        })
    }
}

function deleteFailed (response: Response): Response {
    return response.json({status: 400, message: 'Input incorrect or you do not have permission to delete this profile.', data: null})
}

function deleteSucceeded (response: Response, profile: Profile): Response {
    const {profileId, profileEmail, profileFirstName, profileHash, profileLastName, profileUsername} = profile
    const loggedProfile: PartialProfile = {
        profileId,
        profileEmail,
        profileFirstName,
        profileHash,
        profileLastName,
        profileUsername
    }
    removeProfile(loggedProfile)
    return response.json({status: 200, message: 'Profile deleted.', data: null})
}

export async function getAllProfileController(request: Request, response: Response): Promise<Response> {
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
        const {profileId} = request.params
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
        const {profileId} = request.params
        const {profileEmail, profileFirstName, profileLastName, profilePassword, profileUsername} = request.body
        const profileHash = await setHash(profilePassword)
        // @ts-ignore
        const profileIdFromSession = request.session.profile.profileId as string

        const performUpdate = async (profile: Profile): Promise<Response> => {
            // @ts-ignore
            const previousProfile: Profile = await selectProfileByProfileId(profileIdFromSession)
            const newProfile: Profile = {...previousProfile, ...profile}
            await updateProfile(newProfile)
            return response.json({status: 200, message: 'Profile updated.', data: null})
        }

        const updateFailed = (message: string): Response => {
            return response.json({ status: 400, data: null, message })
        }

        // @ts-ignore
        return profileId === profileIdFromSession ? await performUpdate({profileEmail, profileAuthenticationToken: null, profileFirstName, profileLastName, profileHash, profileUsername}) : updateFailed('Please login to update profile.')
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server cannot reach profile, try again later.',
            data: null
        })
    }
}