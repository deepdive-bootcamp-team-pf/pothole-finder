import { Profile } from "../interfaces/Profile";
import { connect } from "../database.utils";

export async function insertProfile(profile: Profile): Promise<string> {
  const mysqlConnection = await connect();
  const mysqlQuery =
    "INSERT INTO profile(profileId, profileAuthenticationToken, profileEmail, profileFirstName, profileHash, profileLastName, profileUsername) VALUES (UUID_TO_BIN(UUID()), :profileAuthenticationToken, :profileEmail, :profileFirstName, :profileHash, :profileLastName, :profileUsername)";
  await mysqlConnection.execute(mysqlQuery, profile);
  await mysqlConnection.release();
  return "Profile created successfully.";
}
