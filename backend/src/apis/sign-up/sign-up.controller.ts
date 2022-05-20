import { Request, Response } from 'express'
import { Profile } from '../../utils/interfaces/Profile'
import { setActivationToken, setHash } from '../../utils/auth.utils'
import { insertProfile } from '../../utils/profile/insertProfile'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import Client from 'mailgun.js/dist/lib/client'

export async function signupProfileController(request: Request, response: Response): Promise<Response|undefined> {
    try {
        const mailgun: Mailgun = new Mailgun(formData)
        const mailgunClient: Client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string})

        const { profileEmail, profileFirstName, profileLastName, profilePassword, profileUsername} = request.body
        const profileAuthenticationToken = setActivationToken()
        const profileHash = await setHash(profilePassword)

        const basePath: string = `${request.protocol}://${request.hostname}/${request.originalUrl}/activation/${profileAuthenticationToken}`

        const message = `<h1>Welcome to Pothole Finder</h1>
                         <p>Do you wish to join the fight against nefarious potholes that occupy your local routes? Activate your account now!</p>
                         <p><a href="${basePath}">${basePath}</a></p>
                         <p>Humankind will stand victorious. Short live the potholes!</p>`

        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
            to: profileEmail,
            subject: 'Which side do you stand with? Join the fight today.',
            html: message
        }

        const profile: Profile = {
            profileId: null,
            profileAuthenticationToken,
            profileEmail,
            profileFirstName,
            profileHash,
            profileLastName,
            profileUsername
        }
        await insertProfile(profile)

        await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

        return response.json({status: 200, message: 'Profile created, check your email for confirmation.', data: null})
    } catch (e) {
        return response.json({
            status: 500,
            message: 'Server error verifying pothole, try again later.',
            data: null
        })
    }
}