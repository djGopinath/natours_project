const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
//Port
const port = process.env.PORT || 8000;

//Server
app.listen(port, () => {
  // console.log(`listening on port ${port}...`);
});
