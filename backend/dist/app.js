"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = require("./middleware/notFound");
const errorHandler_1 = require("./middleware/errorHandler");
const authenticate_1 = require("./middleware/authenticate");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_1.env.corsOrigin.split(',').map((origin) => origin.trim()),
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: '1mb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)(env_1.env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(authenticate_1.authenticate);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api', routes_1.default);
app.use(notFound_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
