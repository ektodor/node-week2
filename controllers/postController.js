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
    // id 不符合格式會在 try catch 直接跳 catch，
    // 如果只是替換 id 其中一個字但是該 id 本身不存在則會回傳修改 or 刪除成功，
    // 並回傳 null，因為它符合 id 格式。
    const posts = await Post.findByIdAndUpdate(id, JSON.parse(data), {
      new: true,
      runValidators: true,
    });
    if (posts) {
      successHandler(res, "更新成功", posts);
    } else {
      errorHandler(res, "查無此 id");
    }
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
