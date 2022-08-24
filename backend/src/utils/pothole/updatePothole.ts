import { Pothole } from "../interfaces/Pothole";
import { connect } from "../database.utils";

export async function updatePothole(pothole: Pothole): Promise<string> {
  const mysqlConnection = await connect();
  const mysqlQuery =
    "update pothole set potholeDescription = :potholeDescription, potholeLng = :potholeLng, potholeLat = :potholeLat, potholeSeverity = :potholeSeverity where potholeId = UUID_TO_BIN(:potholeId)";
  await mysqlConnection.execute(mysqlQuery, pothole);
  await mysqlConnection.release();
  return "Pothole updated successfully";
}
