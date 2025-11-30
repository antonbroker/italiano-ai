"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequestError = exports.notFoundError = exports.HttpError = void 0;
class HttpError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.HttpError = HttpError;
const notFoundError = (message) => new HttpError(404, message);
exports.notFoundError = notFoundError;
const badRequestError = (message) => new HttpError(400, message);
exports.badRequestError = badRequestError;
