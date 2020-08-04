/**
 * Register your Express middlewares
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com
 */

import Statics from './Statics';
import Http from './Http';
import Security from './Security';
import Locals from '../config/Locals';
import GraphQLServer from './GraphQL';

import { Application } from 'express';

class Kernel {
  public security: Security;
  public express: Application;
  public statics: Statics;
  public http: Http;
  public graphql: GraphQLServer;

  constructor(__express: Application) {
	this.security = new Security(__express);
	this.statics = new Statics(__express);
	this.http = new Http(__express);
	this.graphql = new GraphQLServer(__express);
	this.express = __express;
  }

  public async init(): Promise<Application> {
	this.express = this.statics.mount();
	this.express = Locals.init(this.express);
	this.express = this.security.apply();
	this.express = this.http.mount();
	this.express = await this.graphql.mount();
	return this.express;
  }
}

export default Kernel;
