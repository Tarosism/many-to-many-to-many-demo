const Sequelize = require("sequelize");

module.exports = class comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        ment: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.comment.belongsToMany(db.post, {
      through: db.post_comment,
    });
    db.comment.hasMany(db.post_comment);
    db.comment.belongsTo(db.user);
  }
};
