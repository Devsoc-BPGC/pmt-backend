/**
 * Defines all the requisites in HTTP
 *
 * @author DevSoc
 */
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as express from 'express';

class Http {
    public static mount(__express__: express.Application): express.Application {

        __express__.use(cookieParser());
        __express__.use(bodyParser.json());
        __express__.use(bodyParser.urlencoded({ extended: true }));
        __express__.use(passport.initialize());
        __express__.use(express.static(path.join(__dirname,'public')));

        __express__.use((req, res, next): void => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // cors header
            if (req.method == "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, HEAD");
                res.header('Access-Control-Max-Age', '1728000');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Authorization, X-AUTH-TOKEN");
                res.header("Content-Length", "0");
                res.sendStatus(208);
            } else {
                next();
                // Google analytics logging comes here
            }        
        })

        // Disable the x-powered-by header in response
		__express__.disable('x-powered-by');

        __express__.use('/', (req, res): void => {
            console.log('Welcome to the app');
            res.status(200).json({
                "success": true,
                "message": "Welcome to Mello: Simple, Sweet and Mello :D"
            })
        })

        return __express__;
    }
}

export default new Http;