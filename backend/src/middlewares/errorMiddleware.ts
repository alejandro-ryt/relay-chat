import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@/utils/errorHandler";
import { ERROR } from "@/constants/relayChat";

export const errorMiddleware = (
    err: Error | ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = 500;
    let message = ERROR.INTERNAL_SERVICE_ERROR;

    if (err instanceof ErrorHandler) {
        statusCode = err.statusCode;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        error: message
    });
};
