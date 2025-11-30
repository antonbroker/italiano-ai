"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const sequelize_1 = require("./db/sequelize");
const models_1 = require("./models");
async function start() {
    try {
        (0, models_1.initModels)();
        await sequelize_1.sequelize.authenticate();
        await sequelize_1.sequelize.sync();
        const server = app_1.default.listen(env_1.env.port, () => {
            console.log(`API server listening on port ${env_1.env.port}`);
        });
        const shutdown = () => {
            server.close(async () => {
                await sequelize_1.sequelize.close();
                console.log('Gracefully shutting down');
            });
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
start();
