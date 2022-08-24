import { PotholeVerification } from "../interfaces/PotholeVerification";
import { connect } from "../database.utils";

export async function removePotholeVerification(
  potholeVerification: PotholeVerification
): Promise<string> {
  const mysqlConnection = await connect();
  const mysqlQuery =
    "DELETE FROM potholeVerification WHERE potholeVerificationPotholeId = UUID_TO_BIN(:potholeVerificationPotholeId) AND potholeVerificationProfileId = UUID_TO_BIN(:potholeVerificationProfileId)";
  await mysqlConnection.execute(mysqlQuery, potholeVerification);
  await mysqlConnection.release();
  return "Pothole verification deleted.";
}
