const { connect } = require("mongoose");

const connectDB = (path) => {
  return connect(path);
};

module.exports = connectDB;
