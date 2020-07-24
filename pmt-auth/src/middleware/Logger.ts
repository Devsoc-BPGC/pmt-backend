/**
* Logger middleware with error handling
*/

import * as morgan from 'morgan';
import * as fs from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';
import { Express } from 'express';

class Loggers {
	public errorhandle(err: Error)  {
		console.log('File Logger Error: ', err);
		console.log('Due to the above error, incoming requests will not be saved to the logfile');
		return morgan('dev', {
			skip: function (req: Request, res: Response) { return true; }
		});
	}

	public genstream(): fs.WriteStream {
		return fs.createWriteStream(join(__dirname, '../../logs/logger.txt'), { flags: 'as' });;
	}

	public filelogger() {
		let stream: fs.WriteStream = this.genstream();
		stream.on('error', (err: Error) => {
			fs.mkdirSync(join(__dirname, '../../logs'));
			let stream: fs.WriteStream = this.genstream();
			stream.on('error', (err: Error) => {
				return this.errorhandle(err);
			});
			return morgan('dev', { stream });
		});
		return morgan('dev', { stream });
	}

	public consolelogger() {
		return morgan('dev');
	}

	public init() {
		return [ this.filelogger(), this.consolelogger() ]
	}
}

export default Loggers;
