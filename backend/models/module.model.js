const sequelizeConfig = require("../config/sequelize.config");
const Sequelize = require("sequelize");

module.exports = (sequelizeConfig, Sequelize) => {

    const Modules = sequelizeConfig.define('Modules', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    })

    const UserModules = sequelizeConfig.define('UserModules', {
      moduleName: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      className: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })

    const Ressources = sequelizeConfig.define('Ressources', {
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      intitule: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      moduleName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      className: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })


    return [Modules, UserModules, Ressources]

}