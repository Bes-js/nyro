/**
 * Interface representing the options for handling errors.
 *
 * @interface ErrorHandlerOptions
 *
 * @property {string} message - The error message to be displayed.
 * @property {any} [requestOptions] - Optional request options associated with the error.
 * @property {number} statusCode - The HTTP status code associated with the error.
 * @property {string} name - The name of the error.
 * @property {Error} [error] - Optional original error object.
 */
interface ErrorHandlerOptions {
    message: string;
    requestOptions?: any;
    statusCode: number;
    name: string;
    error?: Error;
}
declare class ErrorHandler extends Error {
    requestOptions?: any;
    statusCode: number;
    constructor(errorHandlerOptions: ErrorHandlerOptions);
}

export { ErrorHandler as default };
