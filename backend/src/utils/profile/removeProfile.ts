import { Profile } from '../interfaces/Profile'
import { connect } from '../database.utils'

export async function removeProfile(profile: Profile) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'DELETE FROM profile WHERE profileId = UUID_TO_BIN(:profileId)'
    await mysqlConnection.execute(mysqlQuery, profile)
    await mysqlConnection.release()
    return 'Profile delete.'
}