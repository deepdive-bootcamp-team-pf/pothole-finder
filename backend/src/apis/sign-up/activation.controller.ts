import { Request, Response } from "express";
import { Profile } from "../../utils/interfaces/Profile";
import { selectProfileByProfileAuthenticationToken } from "../../utils/profile/selectProfileByProfileAuthenticationToken";
import { updateProfile } from "../../utils/profile/updateProfile";

export async function activationController(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { activation } = request.params;
    const profile = await selectProfileByProfileAuthenticationToken(activation);

    const activationFail = (): Response =>
      response.json({
        status: 400,
        data: null,
        message:
          "Account activation failed, this account may have already been activated.",
      });

    const activationSuccess = async (profile: Profile): Promise<Response> => {
      const updatedProfile = { ...profile, profileAuthenticationToken: null };
      await updateProfile(updatedProfile);
      return response.json({
        status: 200,
        data: null,
        message: "Account activated!",
      });
    };

    return profile != null
      ? await activationSuccess(profile)
      : activationFail();
  } catch (e: any) {
    return response.json({
      status: 500,
      data: null,
      message: e.message,
    });
  }
}
