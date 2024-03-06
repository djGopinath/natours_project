const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', () => {
  process.exit(1);
});
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected succesfully'));

//Port
const port = process.env.PORT || 8000;

//Server
const server = app.listen(port, () => {
  console.log('Server listening on port', port);
});

process.on('unhandledRejection', () => {
  server.close(() => {
    process.exit(1);
  });
});
