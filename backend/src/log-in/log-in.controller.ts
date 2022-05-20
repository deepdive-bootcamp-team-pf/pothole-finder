import { Request, Response } from 'express'
import 'express-session'
import { v4 as uuid } from 'uuid'
import {Profile} from '../utils/interfaces/Profile'
import {selectProfileByProfileEmail} from "../utils/profile/selectProfileByProfileEmail";
import {generateJwt, validatePassword} from "../utils/auth.utils";

export async function logInController (request: Request, response: Response): Promise<Response> {
    try {
        const { profileEmail, profilePassword } = request.body
        const profile: Profile | null = await selectProfileByProfileEmail(profileEmail)

        return (profile !== null) && await validatePassword(profile.profileHash, profilePassword)
            ? signInSuccessful(request, response, profile)
            : signInFailed(response)
    } catch (error: any) {
        return response.json({status: 500, data: null, message: error.message})
    }
}

function signInFailed (response: Response): Response {
    return response.json({status: 400, message: "Email or password is incorrect. Please try again.", data: null})
}

function signInSuccessful (request: Request, response: Response, profile: Profile): Response {
    const { profileId, profileAuthenticationToken, profileEmail, profileFirstName, profileLastName, profileUsername } = profile
    const signature: string = uuid()
    const authorization: string = generateJwt({
        profileId,
        profileAuthenticationToken,
        profileEmail,
        profileFirstName,
        profileLastName,
        profileUsername
    }, signature)

    // @ts-ignore
    request.session.profile = profile
    // @ts-ignore
    request.session.jwt = authorization
    // @ts-ignore
    request.session.signature = signature

    response.header({
        authorization
    })
    return response.json({status:200, message: 'Log in successful', data: null})
}

export async function getProfileByProfileEmail(request: Request, response: Response): Promise<Response> {
    try {
        const {profileEmail} = request.params
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
