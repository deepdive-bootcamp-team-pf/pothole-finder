import { PotholeVerification } from '../interfaces/PotholeVerification'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectAllPotholeVerifications() : Promise<PotholeVerification[]> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT BIN_TO_UUID(potholeVerificationPotholeId) AS potholeVerificationPotholeId, BIN_TO_UUID(potholeVerificationProfileId) AS potholeVerificationProfileId, potholeVerificationDate, potholeVerificationPhotoURL FROM potholeVerification'
    const result = await mysqlConnection.execute(mysqlQuery) as RowDataPacket[]
    await mysqlConnection.release()
    return result[0] as PotholeVerification[]
}