import { Photo } from '../interfaces/Photo'
import { connect } from '../database.utils'

export async function removePhoto(photo: Photo) : Promise<string> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'delete from photo where photoId = UUID_TO_BIN(:photoId)'
    await mysqlConnection.execute(mysqlQuery, photo)
    await mysqlConnection.release()
    return 'Photo deleted'
}