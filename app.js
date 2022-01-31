require("dotenv").config();

const fs = require("fs");
const https = require("https");
const cors = require("cors");
//const session = require("express-session");
const express = require("express");
const cookieParser = require("cookie-parser");
const { sequelize, post, post_comment, comment, user } = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

// sequelize
//   .query("SET FOREIGN_KEY_CHECKS = 0")
//   .then(() => sequelize.sync({ force: true }))
//   .then(() => sequelize.query("SET FOREIGN_KEY_CHECKS = 1"))
//   .then(() => console.log("DB연결 성공"));

sequelize.sync({ force: false }).then(() => console.log("DB연결 성공"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());
app.get("/", (req, res) => {
  return res.status(200).send("hell world");
});

app.post("/user", async (req, res) => {
  const { username } = req.body;
  await user.create({
    username,
  });
  return res.status(201).send("유저생성");
});

app.post("/post", async (req, res) => {
  const { title } = req.body;
  await post.create({
    title,
  });
  return res.status(201).send("게시글생성");
});

app.post("/comment", async (req, res) => {
  const { postId, text, userId } = req.body;

  const newComment = await comment.create({
    ment: text,
    userId,
  });

  const selectedPost = await post.findOne({
    where: { id: postId },
  });

  await selectedPost.addComment(newComment.id);

  return res.status(201).send("댓굴생성");
});

app.post("/like", async (req, res) => {
  const { postId, userId, commentId } = req.body;

  const selectedPostComment = await post_comment.findOne({
    where: { id: commentId },
  });

  await selectedPostComment.addUser(userId);

  //const result = await selectedPostComment.adduser(userId);

  return res.status(201).send(selectedPostComment);
});

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const key = fs.readFileSync(__dirname + "/key.pem", "utf-8");
  const cert = fs.readFileSync(__dirname + "/cert.pem", "utf-8");
  const credentials = { key, cert };

  https
    .createServer(credentials, app)
    .listen(PORT, () => console.log(`서버 구동(https): PORT번호: ${PORT}`));
} else
  app.listen(PORT, () => console.log(`서버 구동(http): PORT번호: ${PORT}`));
