import { Photo } from '../interfaces/Photo'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectPhotoByPhotoId(photoId: string) : Promise<Photo|null> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'select BIN_TO_UUID(photoID) as photoId, BIN_TO_UUID(photoPotholeId) as photoPotholeId, BIN_TO_UUID(photoProfileId) as photoProfileId, photoDate, photoDescription, photoName, photoURL from photo where photoId = UUID_TO_BIN(:photoId)'
    const result = await mysqlConnection.execute(mysqlQuery, {photoId}) as RowDataPacket[]
    const photo: Photo[] = result[0] as Photo[]
    await mysqlConnection.release()
    return photo.length === 1 ? {...photo[0]} : null
}