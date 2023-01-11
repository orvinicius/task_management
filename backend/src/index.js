const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log("Server running!"));

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hdj2rpz.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
