import { Request, Response, NextFunction } from "express";

interface HttpError extends Error {
  status: number;
  message: string;
}
class ErrorHandler {
  public handler(
    error: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const message = error.message || "Internal server error";
    const status = error.status || 500;
    res.status(status).json({ success: false, message });
  }
}

export default ErrorHandler;
