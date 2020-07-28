/**
 * Serving static files
 *
 * @author DevSoc
 */

import * as path from 'path';
import * as express from 'express';

import { Application } from 'express';

class Statics {
	public express: Application;

	constructor(__express: Application) {
		this.express = __express;
	}

	public mount(): Application {

		console.log('Booting the Statics middleware...');

		// Load Statics
		this.express.use(express.static(path.join(__dirname, '../../../public')));

		// Load NPM Statics
		// this.express.use(express.static(path.join(__dirname, '../../node_modules')));

		return this.express;
	}

}

export default Statics;
