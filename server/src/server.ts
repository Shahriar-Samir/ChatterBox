import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  await mongoose.connect(config.dbURI as string);
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
}

main();
