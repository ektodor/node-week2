const Post = require("../models/post");
const { successHandler, errorHandler } = require("../utils/handler.js");

const getAllPosts = async (res) => {
  const posts = await Post.find();
  successHandler(res, "查詢成功", posts);
};

const createPost = async ({ res, data }) => {
  try {
    const posts = await Post.create(JSON.parse(data));
    successHandler(res, "上傳成功", posts);
  } catch (e) {
    errorHandler(res, e.message);
  }
};

const deleteAllPosts = async (res) => {
  const posts = await Post.deleteMany({});
  successHandler(res, "全部刪除成功", posts);
};

const deletePost = async ({ res, url }) => {
  const id = url.split("/").pop();
  const posts = await Post.findByIdAndDelete(id);

  if (posts) {
    successHandler(res, "刪除成功", posts);
  } else {
    errorHandler(res, "查無此 id");
  }
};

const updatePost = async ({ res, url, data }) => {
  try {
    const id = url.split("/").pop();
    // 沒找到 id 會直接跳 catch
    // 回傳的 post 為更新前
    await Post.findByIdAndUpdate(id, JSON.parse(data));
    successHandler(res, "更新成功");
  } catch (e) {
    errorHandler(res, e.message);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deleteAllPosts,
  deletePost,
  updatePost,
};
