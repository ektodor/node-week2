const postController = require("../controllers/postController.js");
const { successHandler, errorHandler } = require("../utils/handler.js");

const postRouter = async (req, res) => {
  const { method, url } = req;
  let data = "";

  req.on("data", (chuck) => {
    data += chuck;
  });

  if (method == "OPTIONS") {
    successHandler(res, "OK");
  } else if (method == "GET" && url == "/posts") {
    await postController.getAllPosts(res);
  } else if (method == "POST" && url == "/posts") {
    req.on("end", async () => await postController.createPost({ res, data }));
  } else if (method == "DELETE" && url == "/posts") {
    await postController.deleteAllPosts(res);
  } else if (method == "DELETE" && url.startsWith("/posts/")) {
    await postController.deletePost({ res, url });
  } else if (method == "PATCH" && url.startsWith("/posts/")) {
    req.on(
      "end",
      async () => await postController.updatePost({ res, url, data })
    );
  } else {
    errorHandler(res, "404 NOT FOUND", 404);
  }
};

module.exports = postRouter;
