import { Profile } from '../interfaces/Profile'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectProfileByProfileUsername(profileUsername: string): Promise<Profile|null> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT BIN_TO_UUID(profileId) AS profileId, profileAuthenticationToken, profileUsername, profileFirstName, profileHash, profileLastName, profileUsername FROM profile WHERE profileUsername = :profileUsername'
    const result = await mysqlConnection.execute(mysqlQuery, {profileUsername}) as RowDataPacket[]
    const profile: Profile[] = result[0] as Profile[]
    await mysqlConnection.release()
    return profile.length === 1 ? {...profile[0]} : null
}