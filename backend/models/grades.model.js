const sequelizeConfig = require("../config/sequelize.config");
const Sequelize = require("sequelize");
module.exports = (sequelizeConfig, Sequelize) => {

  const Grades = sequelizeConfig.define('Grades', {
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      teacherId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      semestreValue: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      moduleName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      className: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })
    return [Grades]
  }
  