import config from './app/config';
import mongoose from 'mongoose';
import { server } from './lib/socket';

async function main() {
  await mongoose.connect(config.dbURI as string);
  server.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
}

main();
