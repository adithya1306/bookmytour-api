/* eslint-disable */
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');



mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const port = process.env.port || 3005;

app.listen(port, () => {
  console.log(`App running on port ${port}..`);
}); 
