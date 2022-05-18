import { Profile } from '../interfaces/Profile'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectAllProfile() : Promise<Profile[]> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT BIN_TO_UUID(profileId) AS profileId, profileAuthenticationToken, profileEmail, profileFirstName, profileHash, profileLastName, profileUsername FROM profile'
    const result = await mysqlConnection.execute(mysqlQuery) as RowDataPacket[]
    await mysqlConnection.release()
    return result[0] as Profile[]
}