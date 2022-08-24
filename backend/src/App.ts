import express, { Application } from "express";
import morgan from "morgan";
import session from "express-session";
import createMemoryStore from "memorystore";
import { signUpRoute } from "./apis/sign-up/sign-up.route";
import { logInRoute } from "./log-in/log-in.route";
import { signOutRoute } from "./apis/sign-out/sign-out.route";
import { profileRoute } from "./apis/profile/profile.route";
import { potholeRoute } from "./apis/pothole/pothole.route";
import { potholeVerificationRoute } from "./apis/pothole-verification/pothole-verification.route";
import { ImageUploadRouter } from "./apis/photo-upload/photo-upload.route";

const MemoryStore = createMemoryStore(session);
export class App {
  app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  public settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4200);
  }

  private middlewares(): void {
    const sessionConfig = {
      store: new MemoryStore({
        checkPeriod: 100800,
      }),
      secret: "secret",
      saveUninitialized: true,
      resave: true,
      maxAge: "3h",
    };

    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(session(sessionConfig));
  }

  private routes(): void {
    this.app.use("/apis/sign-up", signUpRoute);
    this.app.use("/apis/login", logInRoute);
    this.app.use("/apis/sign-out", signOutRoute);
    this.app.use("/apis/profile", profileRoute);
    this.app.use("/apis/pothole", potholeRoute);
    this.app.use("/apis/pothole-verification", potholeVerificationRoute);
    this.app.use("/apis/image-upload", ImageUploadRouter);
  }

  public async listen(): Promise<void> {
    await this.app.listen(this.app.get("port"));
    console.log("Express application built successfully");
  }
}
