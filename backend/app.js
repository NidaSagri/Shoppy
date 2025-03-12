const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");

//config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "2gb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: "https://shoppy-cc0hdp7wl-nida-sagris-projects.vercel.app" || "http://localhost:5173", // Default to localhost for local development
    credentials: true,
  })
);

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

module.exports = app;
