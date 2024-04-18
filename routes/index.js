const postRouter = require("./postRouter");

const routes = (req, res) => {
  postRouter(req, res);
};

module.exports = routes;
