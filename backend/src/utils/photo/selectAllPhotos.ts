import { Photo } from '../interfaces/Photo'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectAllPhotos() : Promise<Photo[]> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'select BIN_TO_UUID(photoID) as photoId, photoPotholeId, photoDate, photoDescription, photoName, photoURL from photo'
    const result = await mysqlConnection.execute(mysqlQuery) as RowDataPacket[]
    await mysqlConnection.release()
    return result [0] as Photo[]
}