import {Photo} from '../interfaces/Photo'
import { connect } from '../database.utils'


export async function insertPhoto(photo: Photo) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'insert into photo(photoId, photoPotholeId, photoProfileId, photoDate, photoDescription, photoName, photoURL) values (UUID_TO_BIN(UUID()))'
    await mysqlConnection.execute(mysqlQuery, photo)
    await mysqlConnection.release()
    return 'Photo uploaded successfully'
}