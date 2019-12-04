const mongoose = require("mongoose");
const Record = require("../models/Record");

(async () => {
  // connect to DB
  mongoose.connect("mongodb://127.0.0.1:27017/record-shop", {
    userNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on("error", console.error);
  mongoose.connection.on("open", () => {
    console.log("Database connection established ...");
  });
  console.log("This is the purge");

  try {
    await Record.deleteMany({});
    console.log("Records purged");
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();
})();
