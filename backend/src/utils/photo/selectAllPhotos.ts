import { Photo } from '../interfaces/Photo'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectAllPhotos() : Promise<Photo[]> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'select BIN_TO_UUID(photoID) as photoId, BIN_TO_UUID(photoPotholeId) as photoPotholeId, BIN_TO_UUID(photoProfileId) as photoProfileId, photoDate, photoDescription, photoName, photoURL from photo'
    const result = await mysqlConnection.execute(mysqlQuery) as RowDataPacket[]
    await mysqlConnection.release()
    return result [0] as Photo[]
}