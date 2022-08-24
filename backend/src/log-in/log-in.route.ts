import { Router } from "express";
import { checkSchema, check } from "express-validator";
import { asyncValidatorController } from "../utils/controllers/asyncValidator.controller";
import {
  logInController,
  getProfileByProfileUsername,
} from "./log-in.controller";
import { logInValidator } from "./log-in.validator";

export const logInRoute: Router = Router();

logInRoute
  .route("/")
  .post(asyncValidatorController(checkSchema(logInValidator)), logInController);

logInRoute
  .route("/:profileEmail")
  .get(
    asyncValidatorController([check("profileUsername", "Test message")]),
    getProfileByProfileUsername
  );
