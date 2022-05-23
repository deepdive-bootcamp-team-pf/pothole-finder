import {Pothole} from '../interfaces/Pothole'
import { connect } from '../database.utils'

export async function updatePothole(pothole: Pothole) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'update pothole set potholeId = :potholeId, potholeProfileId = :potholeProfileId,  potholeDate = :potholeDate, potholeDescription = :potholeDescription, potholeLng = :potholeLng, potholeLat = :potholeLat, potholeSeverity = :potholeSeverity where UUID_TO_BIN (:potholId)'
    await mysqlConnection.execute(mysqlQuery, pothole)
    await mysqlConnection.release()
    return 'Pothole updated successfully'
}