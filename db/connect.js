const mongoose = require("mongoose");

const connectionDB = async (url) => {
  try {
        await mongoose
            .connect(url);
        return console.log("connected to database");
    } catch (err) {
        return console.log(err);
    }
};

module.exports = connectionDB;
