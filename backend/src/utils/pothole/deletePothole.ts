import { Pothole } from '../interfaces/Pothole'
import { connect } from '../database.utils'
import {RowDataPacket} from 'mysql2'

export async function getAllPothole() : Promise<Pothole[]> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'DELETE FROM pothole WHERE potholeId = UUID_TO_BIN()'
    const result =await mysqlConnection.execute(mysqlQuery) as RowDataPacket[]
    await mysqlConnection.release()
    return result[0] as Pothole[]
}