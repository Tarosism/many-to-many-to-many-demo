const Sequelize = require("sequelize");

module.exports = class user_comment extends Sequelize.Model {
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
        modelName: "user_comment",
        tableName: "user_comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
};
