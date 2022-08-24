import { Pothole } from "../interfaces/Pothole";
import { connect } from "../database.utils";
import { RowDataPacket } from "mysql2";

export async function selectPotholesByPotholeProfileId(
  potholeProfileId: string
): Promise<Pothole[]> {
  const mysqlConnection = await connect();
  const mysqlQuery =
    "SELECT BIN_TO_UUID(potholeId) AS potholeId, BIN_TO_UUID(potholeProfileId) AS potholeProfileId, potholeDate, potholeDescription, potholeLat, potholeLng, potholeSeverity, photo.photoURL, photo.photoName FROM pothole inner join photo on photo.photoPotholeId = pothole.potholeId where potholeProfileId = UUID_TO_BIN(:potholeProfileId)";
  const result = (await mysqlConnection.execute(mysqlQuery, {
    potholeProfileId,
  })) as RowDataPacket[];
  await mysqlConnection.release();
  return result[0] as Pothole[];
}
