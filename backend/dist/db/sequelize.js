"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_1 = require("../config/env");
const useSsl = process.env.DATABASE_SSL === 'true';
exports.sequelize = new sequelize_1.Sequelize(env_1.env.databaseUrl, {
    dialect: 'postgres',
    logging: env_1.env.nodeEnv === 'development' ? console.log : false,
    define: {
        underscored: true,
        timestamps: true,
    },
    dialectOptions: useSsl
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
        : {},
});
