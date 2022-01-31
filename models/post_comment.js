const Sequelize = require("sequelize");

module.exports = class post_comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "post_comment",
        tableName: "post_comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.post_comment.belongsToMany(db.user, {
      through: db.user_comment,
    });
    db.post_comment.belongsTo(db.post);
    db.post_comment.belongsTo(db.comment);
  }
};
