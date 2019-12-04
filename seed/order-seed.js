let faker = require("faker");
const mongoose = require("mongoose");
const Order = require("../models/Order");

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
    await Order.deleteMany({});
    console.log("Orders purged");
  } catch (err) {
    console.error(err);
  }
  const orderPromises = Array(50)
    .fill(null)
    .map(() => {
      const order = new Order({
        quantity: Math.trunc(faker.random.number() / 2),
        record: faker.random.number()
      });
      return order.save(); // without callback function , it returns a promises
    });
  try {
    await Promise.all(orderPromises);
    console.log("The orders are seeded");
  } catch (e) {
    Console.error(e);
  }
  mongoose.connection.close();
})();
