import { Pothole } from "../interfaces/Pothole";
import { connect } from "../database.utils";

export async function removePothole(pothole: Pothole): Promise<string> {
  const mysqlConnection = await connect();
  const mysqlDelete =
    "delete from pothole where potholeId = UUID_TO_BIN(:potholeId)";
  await mysqlConnection.execute(mysqlDelete, pothole);
  await mysqlConnection.release();
  return "Pothole deleted";
}
