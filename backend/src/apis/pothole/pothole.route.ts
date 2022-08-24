import { Router } from "express";
import { check, checkSchema } from "express-validator";
import { asyncValidatorController } from "../../utils/controllers/asyncValidator.controller";
import { isLoggedIn } from "../../utils/controllers/isLoggedIn.controller";
import { potholeValidator } from "./pothole.validator";
import {
  postPotholeController,
  deletePotholeController,
  getAllPotholesController,
  getPotholeByPotholeIdController,
  getPotholesByPotholeProfileIdController,
  putPotholeController,
} from "./pothole.controller";

export const potholeRoute = Router();

potholeRoute
  .route("/")
  .get(getAllPotholesController)
  .post(
    isLoggedIn,
    asyncValidatorController(checkSchema(potholeValidator)),
    postPotholeController
  );

potholeRoute
  .route("/potholeProfileId/:potholeProfileId")
  .get(
    asyncValidatorController([
      check(
        "potholeProfileId",
        "Enter a valid profile ID for pothole"
      ).isUUID(),
    ]),
    getPotholesByPotholeProfileIdController
  );

potholeRoute
  .route("/:potholeId")
  .get(
    asyncValidatorController([
      check("potholeId", "Enter a valid pothole ID").isUUID(),
    ]),
    getPotholeByPotholeIdController
  )
  .delete(
    isLoggedIn,
    asyncValidatorController([
      check("potholeId", "Enter a valid pothole ID").isUUID(),
    ]),
    deletePotholeController
  )
  .put(
    isLoggedIn,
    asyncValidatorController(checkSchema(potholeValidator)),
    putPotholeController
  );
