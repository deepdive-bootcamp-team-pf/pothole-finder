import { PotholeVerification } from '../interfaces/PotholeVerification'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectAllPotholeVerification() : Promise<PotholeVerification[]> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT * FROM potholeVerification'
    const result = await mysqlConnection.execute(mysqlQuery) as RowDataPacket[]
    await mysqlConnection.release()
    return result[0] as PotholeVerification[]
}