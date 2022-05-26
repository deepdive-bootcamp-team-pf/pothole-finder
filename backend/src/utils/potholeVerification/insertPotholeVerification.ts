import { PotholeVerification } from '../interfaces/PotholeVerification'
import { connect } from '../database.utils'

export async function insertPotholeVerification(potholeVerification: PotholeVerification) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'INSERT INTO potholeVerification(potholeVerificationPotholeId, potholeVerificationProfileId, potholeVerificationDate, potholeVerificationPhotoURL) VALUES (UUID_TO_BIN(:potholeVerificationPotholeId), UUID_TO_BIN(:potholeVerificationProfileId), NOW(), :potholeVerificationPhotoURL)'
    await mysqlConnection.execute(mysqlQuery, potholeVerification)
    await mysqlConnection.release()
    return 'Pothole verified!'
}