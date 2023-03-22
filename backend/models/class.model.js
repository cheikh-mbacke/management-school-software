const sequelizeConfig = require("../config/sequelize.config");
const Sequelize = require("sequelize");
const [Users, Roles] = require("./user.model.js")(sequelizeConfig, Sequelize);
module.exports = (sequelizeConfig, Sequelize) => {

    const Classes = sequelizeConfig.define('Classes', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    })
    
    const UserClasses = sequelizeConfig.define('UserClasses', {
      className: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  
      return [Classes, UserClasses]
  
    }
    