const db = require('../models')
const bcrypt = require('bcrypt')
const sequelizeConfig = require("../config/sequelize.config");

exports.getTeachers = (req, res) => {
const unavailableError = "le serveur est temporairement indisponible !"
  db.Users.findAll({
    attributes: ['id', 'firstName', 'lastName'],
    include: {
      model: db.Roles, where: { role: 'teacher' },
      attributes: []
    }
  })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() =>
      res.status(500).json({ error: unavailableError })
    )
}

exports.getStudents = (req, res) => {
    const unavailableError = "le serveur est temporairement indisponible !"
      db.Users.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        include: {
          model: db.Roles, where: { role: 'student' },
          attributes: []
        }
      })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.getStudent = (req, res) => {
  const unavailableError = "le serveur est temporairement indisponible !"
  let data = {}
  db.Users.findOne({where: {id: req.params.userId}})
      .then(user => {
        if(user === null) res.status(404).json({error: "Cet utilisateur n'existe pas !"})
          data = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              date_of_birth: user.date_of_birth.toLocaleDateString(),
              date_of_registration: user.createdAt.toLocaleDateString()
          }
          db.Roles.findOne({where: {userId: user.id}})
          .then(result => {
                  data['role'] = result.role
                  res.status(200).json(data)
              })
          .catch(() => res.status(500).json({error: unavailableError}))
      })
      .catch(() => res.status(500).json({error: unavailableError}))
}

exports.getTeacherStudents = (req, res) => {
  const unavailableError = "le serveur est temporairement indisponible !"
  sequelizeConfig.query(
    `SELECT userId FROM userclasses WHERE className='${req.body.className}'
    AND userId IN (SELECT users.id FROM users
    INNER JOIN roles ON users.id = userId AND role = 'student')
    `
    )
    .then(data => {
      res.status(200).json(data[0])
    })
    .catch(() =>
    res.status(500).json({error: unavailableError})
)
}

exports.updatePass = (req, res) => {
  const unavailableError = 'Le serveur est temporairement  indisponible !'
  const data = req.body
  db.Users.findOne({
          where: {
              id: data.userId
          }
      })
      .then(user => {
          if (user) {
              //So Hash password
              bcrypt
                  .compare(data.oldPassword, user.password)
                  .then(valid => {
                      if (!valid) {
                          return res.status(401).json({
                              error: 'Votre ancien mot de passe est incorrect.'
                          })
                      }
                      bcrypt
                          .hash(data.newPassword, 10)
                          .then(hash => {
                              db.Users.update({
                                      password: hash
                                  }, {
                                      where: {
                                          id: user.id
                                      }
                                  })
                                  .then(() => res.status(201).json({
                                      password: data.newPassword
                                  }))
                                  .catch(() =>
                                      res
                                      .status(500)
                                      .json({
                                          error: unavailableError
                                      })
                                  )
                          })
                          .catch(() =>
                              res
                              .status(500)
                              .json({
                                  error: unavailableError
                              })
                          )
                  })
                  .catch(() =>
                      res
                      .status(500)
                      .json({
                          error: unavailableError
                      })
                  )
          } else {
              res.status(404).json({
                  error: `Cet utilisateur n'existe pas !`
              })
          }
      })
      .catch(() =>
          res.status(500).json({
              error: unavailableError
          })
      )
}

