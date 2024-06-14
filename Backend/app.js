const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const moongose = require("mongoose");
const path = require("path");
dotenv.config({ path: "config/.env" });

const UserRoutes = require("./routes/Routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(UserRoutes);
app.use(express.static("portal/build"));
app.use((req, res, next) => {
  return res.sendFile(path.join(__dirname, "portal", "build", "index.html"));
});
moongose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App is Running On ` + process.env.PORT);
  });
});
