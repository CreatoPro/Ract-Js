const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB is connected!"))
    .catch((err) => console.log(err));

  app.use(express.json());
  app.use("/api/auth", authRoute);
}
app.listen(8000, () => {
  console.log("Backed server is running");
});
