import * as cors from "cors";
import { Application } from "express";
import * as lusca from "lusca";

class CORS {
	static mount(express: Application): Application {
		express.use(cors());		//Enables cors
		return express;
	}
}
class LUSCA {
	static mount(express: Application): Application {
		express.use(
			lusca({
				xssProtection:true, 	 //Prevents Cross-Site scripting
				nosniff: true, 		 //Prevents MIME-sniffing
				xframe: 'SAMEORIGIN', //Clickjacking
				
			})
		);
		return express;
	}
}
    
class applySecurityMiddleWares {
    public static apply(express: Application): Application {
        express = CORS.mount(express);
        express=LUSCA.mount(express)
		return express;
	}
}

export default applySecurityMiddleWares