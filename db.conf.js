const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGO_DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => console.log(err)
);
mongoose.connection.once("open", () => console.log("Connection Open"));
