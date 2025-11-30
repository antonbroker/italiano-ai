import app from './app';
import { env } from './config/env';
import { sequelize } from './db/sequelize';
import { initModels } from './models';

async function start() {
  try {
    initModels();
    await sequelize.authenticate();
    await sequelize.sync();

    const server = app.listen(env.port, () => {
      console.log(`API server listening on port ${env.port}`);
    });

    const shutdown = () => {
      server.close(async () => {
        await sequelize.close();
        console.log('Gracefully shutting down');
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();

