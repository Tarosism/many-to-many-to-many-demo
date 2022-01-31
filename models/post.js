const Sequelize = require("sequelize");

module.exports = class post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.post.belongsToMany(db.comment, {
      through: db.post_comment,
    });
    db.post.hasMany(db.post_comment);
  }
};
