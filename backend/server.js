const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const dbConnect = require("./db/dbConnect");
const postRouter = require("./routes/postRouter");

// Connect to MongoDB
dbConnect();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Use post routes
app.use("/api", postRouter);

// Login endpoint
app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
