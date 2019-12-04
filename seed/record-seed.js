let faker = require("faker");
const mongoose = require("mongoose");
const Record = require("../models/Record");

(async () => {
  // connect to DB
  mongoose.connect("mongodb://127.0.0.1:27017/record-shop", {
    userNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  const CreateError = require("http-errors");
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
  const recordPromises = Array(50)
    .fill(null)
    .map(() => {
      const record = new Record({
        title: faker.random.word(),
        artist: faker.name.firstName() + " " + faker.name.lastName(),
        year: faker.date.past(),
        img: faker.image.imageUrl(),
        prise: faker.commerce.price()
      });
      return record.save(); // without callback function , it returns a promises
    });
  try {
    await Promise.all(recordPromises);
    console.log("The records are seeded");
  } catch (e) {
    Console.error(e);
  }
  mongoose.connection.close();
})();
