import { Photo } from '../interfaces/Photo'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function getAllPhoto() : Promise<Photo[]> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'delete from photo where photoId = UUID_TO_BIN(:photoId)'
    const result = await mysqlConnection.execute(mysqlQuery) as RowDataPacket[]
    await mysqlConnection.release()
    return result [0] as Photo[]
}