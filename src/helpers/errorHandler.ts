
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


export default class ErrorHandler extends Error {
    requestOptions?: any;
    statusCode: number;
    constructor(errorHandlerOptions: ErrorHandlerOptions) {
        super(errorHandlerOptions.message);
        this.name = 'NyroError';
        this.requestOptions = errorHandlerOptions.requestOptions;
        this.statusCode = errorHandlerOptions.statusCode;
        this.stack = errorHandlerOptions.error?.stack;
    }
}