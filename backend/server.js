const express = require("express");
const connectDB = require("./config/db");
const booksRoutes = require("./routes/api/books");
const usersRoutes = require("./routes/api/users");
const loginRoutes = require("./routes/api/login");
const requestRoutes = require("./routes/api/requests");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
app.use("/api/books", booksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/requests", requestRoutes);

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
