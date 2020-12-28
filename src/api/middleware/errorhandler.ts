import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../interfaces/vendors/Error';

class ErrorHandler {
	public static handle(
		error: HttpError,
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const message = error.message || 'Internal server error';
		const status = error.status || 500;
		res.status(status).json({
			success: false,
			message: message
		});
	}
}

export default ErrorHandler;
