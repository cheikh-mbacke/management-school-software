const sequelizeConfig = require("../config/sequelize.config");
const Sequelize = require("sequelize");

module.exports = (sequelizeConfig, Sequelize) => {

    const TimeTable = sequelizeConfig.define('TimeTable', {
      startHour: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      startMinute: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endHour: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endMinute: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      className: {
        type: Sequelize.STRING,
        allowNull: false
      },
      moduleName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      teacherId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      descColor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      classroom: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  
    return [TimeTable];
  };
  
  