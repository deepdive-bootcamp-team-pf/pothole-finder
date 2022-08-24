import { Request, Response } from "express";
import { Status } from "../../utils/interfaces/Status";

export function signOutController(
  request: Request,
  response: Response
): Response<Status> {
  const status: Status = {
    status: 200,
    message: "sign out successful",
    data: null,
  };
  const { session } = request;
  session?.destroy(() => {});
  return response.json(status);
}
