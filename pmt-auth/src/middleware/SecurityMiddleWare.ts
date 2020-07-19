import * as cors from 'cors';
import { Application } from 'express';
import * as lusca from 'lusca';

class SecurityMiddleWare {
	private defaultCors(express: Application): Application {
		express.use(cors()); 				// Enables cors
		return express;
	}

	private lusca(express: Application): Application {
		express.use(
			lusca({
				xssProtection: true, 		// Prevents Cross-Site scripting
				nosniff: true, 				// Prevents MIME-sniffing
				xframe: 'SAMEORIGIN' 		// Prevents Clickjacking
			})
		);
		return express;
	}

	public apply(express: Application): Application {
		express = this.defaultCors(express);
		express = this.lusca(express);
		return express;
	}
}

export default SecurityMiddleWare;
