const mongoose = require("mongoose");
const faker = require("@faker-js/faker").faker;
const CustomerModel = require("../models/Customer.js");
const dotenv = require("dotenv");
dotenv.config();

const generateFakeCustomers = async (numRecords) => {
  const customers = [];

  for (let i = 1; i <= numRecords; i++) {
    customers.push({
      s_no: i,
      name_of_customer: faker.person.fullName(), // Updated from faker.name.fullName()
      email: faker.internet.email(),
      mobile_number: faker.phone.number("##########"), // Random 10-digit number
      dob: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      created_at: faker.date.past(),
      modified_at: faker.date.recent(),
    });

    // Log progress every 100,000 records
    if (i % 100000 === 0) {
      console.log(`${i} records generated`);
    }
  }
  return customers;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");

    const numRecords = 2000000; // Adjust the number of records as needed
    console.log(`Generating ${numRecords} fake customers...`);
    const fakeCustomers = await generateFakeCustomers(numRecords);

    console.log("Inserting records into the database...");
    await CustomerModel.insertMany(fakeCustomers);

    console.log("Database seeding complete");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
};

seedDatabase();
