let faker = require("faker");
const mongoose = require("mongoose");
const User = require("../models/User");

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
    await User.deleteMany({});
    console.log("Users purged");
  } catch (err) {
    console.error(err);
  }
  const userPromises = Array(50)
    .fill(null)
    .map(() => {
      const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city()
        }
      });
      return user.save(); // without callback function , it returns a promises
    });
  try {
    await Promise.all(userPromises);
    console.log("The users are seeded");
  } catch (e) {
    Console.error(e);
  }
  mongoose.connection.close();
})();
