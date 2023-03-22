const Sequelize = require("sequelize");
const sequelizeConfig = require("../config/sequelize.config");
const [Users, Roles] = require("./user.model.js")(sequelizeConfig, Sequelize);
const [Classes, UserClasses] = require("./class.model")(sequelizeConfig, Sequelize);
const [Modules, UserModules, Ressources] = require("./module.model")(sequelizeConfig, Sequelize);
const [Grades] = require("./grades.model")(sequelizeConfig, Sequelize);
const [TimeTable] = require("./timetable.model")(sequelizeConfig, Sequelize);


const db = {
  Sequelize: Sequelize,
  sequelize: sequelizeConfig,
  Users: Users,
  Roles: Roles,
  Classes: Classes,
  UserClasses: UserClasses,
  Modules: Modules,
  UserModules: UserModules,
  Ressources: Ressources,
  Grades: Grades,
  TimeTable: TimeTable
};

module.exports = db;