import "express-session";
import { App } from "./App";
import { Profile } from "./utils/interfaces/Profile";

declare module "express-session" {
  export interface SessionData {
    profile: Profile | undefined;
    signature: string | undefined;
    jwt: string | undefined;
  }
}
async function main() {
  try {
    const app = new App(4200);
    await app.listen();
  } catch (e) {
    console.log(e);
  }
}

main();
