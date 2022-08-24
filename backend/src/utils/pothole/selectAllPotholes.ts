import { Pothole } from "../interfaces/Pothole";
import { connect } from "../database.utils";
import { RowDataPacket } from "mysql2";

export async function selectAllPotholes(): Promise<Pothole[]> {
  const mysqlConnection = await connect();
  const mysqlQuery =
    "SELECT BIN_TO_UUID(potholeId) AS potholeId, BIN_TO_UUID(potholeProfileId) AS potholeProfileId, potholeDate, potholeDescription, potholeLat, potholeLng, potholeSeverity, photo.photoURL, photo.photoName FROM pothole inner join photo on photo.photoPotholeId = pothole.potholeId";
  const result = (await mysqlConnection.execute(mysqlQuery)) as RowDataPacket[];
  await mysqlConnection.release();
  return result[0] as Pothole[];
}
