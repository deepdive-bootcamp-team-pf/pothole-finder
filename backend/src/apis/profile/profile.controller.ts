import {Request, Response} from 'express'
import 'express-session'
import {PartialProfile, Profile} from '../../utils/interfaces/Profile'
import {removeProfile} from '../../utils/profile/removeProfile'
import {selectAllProfiles} from '../../utils/profile/selectAllProfiles'
import {selectProfileByProfileId} from '../../utils/profile/selectProfileByProfileId'
import {selectProfileByProfileEmail} from '../../utils/profile/selectProfileByProfileEmail'
import {updateProfile} from '../../utils/profile/updateProfile'
import {setHash, validatePassword} from '../../utils/auth.utils'

export async function deleteProfileController(request: Request, response: Response): Promise<Response> {
    try {
        const {profileId} = request.params
        const {profileEmail, profilePassword} = request.body
        const loggedInProfile = await selectProfileByProfileEmail(profileEmail)

        return (loggedInProfile !== null) && loggedInProfile.profileId === profileId && loggedInProfile.profileEmail == profileEmail && await validatePassword(loggedInProfile.profileHash, profilePassword) ? deleteSucceeded(response, loggedInProfile) : deleteFailed(response)
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
        // @ts-ignore
        const {profileId} = request.session.profileId
        const {profileEmail, profileFirstName, profileLastName, profilePassword, profileUsername} = request.body
        const profileHash = await setHash(profilePassword)

        const profile = request.body.profile as Profile
        const profileIdFromSession = profile.profileId as string

        const performUpdate = async (partialProfile: PartialProfile): Promise<Response> => {
            const previousProfile: Profile = await selectProfileByProfileId(partialProfile.profileId as string) as Profile
            const newProfile: Profile = {...previousProfile, ...partialProfile}
            const result = await updateProfile(newProfile)
            return response.json({status: 200, data: null, result})
        }

        const updateFailed = (message: string): Response => {
            return response.json({status: 400, data: null, message})
        }

        return profileId === profileIdFromSession ?
            await performUpdate({
                profileId,
                profileEmail,
                profileFirstName,
                profileLastName,
                profileHash,
                profileUsername
            }) :
            updateFailed('Cannot perform profile update.')
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server cannot reach profile, try again later.',
            data: null
        })
    }
}