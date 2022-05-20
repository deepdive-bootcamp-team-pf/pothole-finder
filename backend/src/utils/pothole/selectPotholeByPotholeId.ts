import { Pothole } from '../interfaces/Pothole'
import { connect } from '../database.utils'
import {RowDataPacket} from 'mysql2'

export async function selectPotholeByPotholeId(potholeId: string) : Promise<Pothole|null> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT BIN_TO_UUID(potholeId) AS potholeId, potholeProfileId, potholeDate, potholeDescription, potholeLat, potholeLng, potholeSeverity FROM pothole WHERE potholeId = UUID_TO_BIN(:potholeId)'
    const result =await mysqlConnection.execute(mysqlQuery, {potholeId}) as RowDataPacket[]
    const pothole: Pothole[] = result[0] as Pothole[]
    await mysqlConnection.release()
    return pothole.length === 1 ? {...pothole[0]} : null
} 