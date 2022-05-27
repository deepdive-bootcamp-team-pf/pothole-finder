import { PotholeVerification } from '../interfaces/PotholeVerification'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectPotholeVerificationByPotholeVerificationId(potholeVerification: PotholeVerification) : Promise<PotholeVerification|null> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT BIN_TO_UUID(potholeVerificationPotholeId) AS potholeVerificationPotholeId, BIN_TO_UUID(potholeVerificationProfileId) AS potholeVerificationProfileId, potholeVerificationDate, potholeVerificationPhotoURL FROM potholeVerification WHERE potholeVerificationPotholeId = UUID_TO_BIN(:potholeVerificationPotholeId) AND potholeVerificationProfileId = UUID_TO_BIN(:potholeVerificationProfileId)'
    const result: RowDataPacket[] = await mysqlConnection.execute(mysqlQuery, potholeVerification) as RowDataPacket[]
    await mysqlConnection.release()
    const rows: PotholeVerification[] = result[0] as PotholeVerification[]
    return rows.length !== 0 ? {...rows[0] } : null
}