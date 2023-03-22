module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true ,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date_of_birth: {
      type: Sequelize.DATE,
      allowNull: false
    }
  })

  const Roles = sequelize.define('Roles', {

    role: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  Users.hasMany(Roles, {foreignKey: 'id'})
  Roles.belongsTo(Users, {foreignKey: 'userId'})

  return [Users, Roles];
};

