import * as cors from 'cors';
import { Application } from 'express';
import * as lusca from 'lusca';

class Security {

	public express: Application;

	constructor(express: Application) {
		this.express = express;
	}

	private defaultCors(): Application {
		this.express.use(cors()); 				// Enables cors
		return this.express;
	}

	private lusca(): Application {
		this.express.use(
			lusca({
				xssProtection: true, 		// Prevents Cross-Site scripting
				nosniff: true, 				// Prevents MIME-sniffing
				xframe: 'SAMEORIGIN' 		// Prevents Clickjacking
			})
		);
		return this.express;
	}

	public apply(): Application {
		this.express = this.defaultCors();
		this.express = this.lusca();
		return this.express;
	}
}

export default Security;
