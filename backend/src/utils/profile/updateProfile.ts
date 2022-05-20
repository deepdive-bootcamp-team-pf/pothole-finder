import { Profile } from '../interfaces/Profile'
import { connect } from '../database.utils'

export async function updateProfile(profile: Profile) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'UPDATE profile SET profileAuthenticationToken = :profileAuthenticationToken, profileEmail = :profileEmail, profileFirstName = :profileFirstName, profileHash = :profileHash, profileLastName = :profileLastName, profileUsername = :profileUsername WHERE profileId = UUID_TO_BIN(:profileId)'
    await mysqlConnection.execute(mysqlQuery, profile)
    await mysqlConnection.release()
    return 'Profile updated.'
}