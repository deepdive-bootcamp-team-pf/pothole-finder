import {Pothole} from '../interfaces/Pothole'
import { connect } from '../database.utils'


export async function insertPothole(pothole: Pothole) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'insert into pothole(potholeId, potholeProfileId, potholeDate, potholeDescription, potholeLng, potholeLat, potholeSeverity) values (UUID_TO_BIN(:potholeId), UUID_TO_BIN(:potholeProfileId), NOW(), :potholeDescription, :potholeLng, :potholeLat, :potholeSeverity)'
    const result = await mysqlConnection.execute(mysqlQuery, pothole)
    await mysqlConnection.release()
    return 'Pothole uploaded successfully'
}