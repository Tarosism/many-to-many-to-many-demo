const Sequelize = require("sequelize");
const user = require("./user");
const post = require("./post");
const comment = require("./comment");
const post_comment = require("./post_comment");
const user_comment = require("./user_comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = user;
db.post = post;
db.comment = comment;
db.post_comment = post_comment;
db.user_comment = user_comment;

user.init(sequelize);
post.init(sequelize);
comment.init(sequelize);
post_comment.init(sequelize);
user_comment.init(sequelize);

user.associate(db);
post.associate(db);
comment.associate(db);
post_comment.associate(db);
user_comment.associate(db);

module.exports = db;
