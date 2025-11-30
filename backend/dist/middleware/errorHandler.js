"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpError_1 = require("../utils/httpError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof httpError_1.HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error('[error]', err);
    return res.status(500).json({ message: 'Internal server error' });
};
exports.errorHandler = errorHandler;
