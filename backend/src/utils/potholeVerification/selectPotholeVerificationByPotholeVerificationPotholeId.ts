import { PotholeVerification } from '../interfaces/PotholeVerification'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectPotholeVerificationByPotholeVerificationPotholeId(potholeVerificationPotholeId: string) : Promise<PotholeVerification|null> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT BIN_TO_UUID(potholeVerificationPotholeId) AS potholeVerificationPotholeId, BIN_TO_UUID(potholeVerificationProfileId) AS potholeVerificationProfileId, potholeVerificationDate, potholeVerificationPhotoURL FROM potholeVerification WHERE potholeVerificationProfileId = UUID_TO_BIN(:potholeVerificationProfileId)'
    const result = await mysqlConnection.execute(mysqlQuery, {potholeVerificationPotholeId}) as RowDataPacket[]
    const potholeVerification: PotholeVerification[] = result[0] as PotholeVerification[]
    await mysqlConnection.release()
    return potholeVerification.length === 1 ? {...potholeVerification[0]} : null
}