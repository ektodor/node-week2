const routes = require("./routes/index.js");
require("./connections/dbConnect.js");

const app = async (req, res) => {
  routes(req, res);
};

module.exports = app;
