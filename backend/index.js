const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require('./models');


const LoginRouter = require("./routes/Login");
app.use("/Login", LoginRouter);

const UserRouter = require("./routes/User");
app.use("/user", UserRouter);


db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
});