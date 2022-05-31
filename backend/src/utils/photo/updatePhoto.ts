import {Photo} from '../interfaces/Photo'
import { connect } from '../database.utils'

export async function updatePhoto(photo: Photo) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'update photo set  photoDescription = :photoDescription, photoName = :photoName, photoURL = :photoURL where photoId = UUID_TO_BIN (:photoId)'
    await mysqlConnection.execute(mysqlQuery, photo)
    await mysqlConnection.release()
    return 'Photo updated successfully'
}