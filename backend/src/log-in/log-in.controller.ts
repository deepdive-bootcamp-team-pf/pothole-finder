import { Request, Response } from 'express'
import 'express-session'
import { v4 as uuid } from 'uuid'
import {Profiler} from 'inspector'

export async function logInController (request: Request, response: Response): Promise<Response> {
    try {
        const { profileEmail, profilePassword } = request.body
        const profile: Profile | null = await selectProfilebyProfileEmail(profileEmail)

        return (profile !== null) && await validatePassword(profile.profileHash, profilePassword)
            ? signInSuccessful(request, response, profile)
            : signInFailed(response)
    } catch (error: any) {
        return response.json({status: 500, data: null, message: error.message})
    }
}

function singInFailed (response: Response): Response {
    return response.json({status: 400, message: "Email or password is incorrect. Please try again., data: null"})
}

function singInSuccessful (request: Request, response: Response, profile: Profile): Response {
    const { profileId, profileAuthenticationToken, profileEmail, profileFirstName, profileLastName, profileUsername } = profile
    const signature: string uuid()
    const authorization; string = generateJwt({
        profileId,
        profileAuthenticationToken,
        profileEmail,
        profileFirstName,
        profileLastName,
        profileUsername
    }, signature)

    request.session.profile = profile
    request.session.jwt = authorization
    request.session.signature = signature

    response.header({
        authorization
    })
    return response.json({status:200, message: 'Log in successful', data: null})
}