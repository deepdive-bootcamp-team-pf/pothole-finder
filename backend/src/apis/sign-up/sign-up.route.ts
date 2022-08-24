import { Router } from "express";
import { check, checkSchema } from "express-validator";
import { asyncValidatorController } from "../../utils/controllers/asyncValidator.controller";
import { activationController } from "./activation.controller";
import { signupProfileController } from "./sign-up.controller";
import { signupValidator } from "./sign-up.validator";

export const signUpRoute = Router();

signUpRoute
  .route("/")
  .post(
    asyncValidatorController(checkSchema(signupValidator)),
    signupProfileController
  );

signUpRoute
  .route("/activation/:activation")
  .get(
    asyncValidatorController([
      check("activation", "invalid activation link").isHexadecimal().notEmpty(),
    ]),
    activationController
  );
