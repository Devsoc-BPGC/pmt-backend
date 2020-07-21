/**
 * Register your Express middlewares
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com
 */

import Http from "./Http";
import Security from "./Security";
import Passport from "./Passport";
import Locals from "../config/Locals";

import { Application } from "express";

class Kernel {
  public security: Security;
  public express: Application;
  public http: Http;
  public passport: Passport;
  public locals: Locals;

  constructor(__express: Application) {
    this.security = new Security(__express);
    this.http = new Http(__express);
    this.express = __express;
    this.passport = new Passport();
    this.locals = new Locals(__express);
  }

  public init(): Application {
    this.express = this.locals.init();
    this.express = this.security.apply();
    this.express = this.passport.init();
    this.express = this.http.mount();

    return this.express;
  }
}

export default Kernel;
