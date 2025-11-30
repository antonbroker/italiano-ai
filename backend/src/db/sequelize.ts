import { Sequelize } from 'sequelize';
import { env } from '../config/env';

const useSsl = process.env.DATABASE_SSL === 'true';

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: env.nodeEnv === 'development' ? console.log : false,
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

