import { Photo } from '../interfaces/Photo'
import { connect } from '../database.utils'

export async function insertPhoto(photo: Photo) : Promise<string> {
    const mysqlConnection = await connect()

}