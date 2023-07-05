const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




// Create and Save a new User
exports.signup = (req, res) => {
  const unavailableError = 'Le serveur est temporairement  indisponible !'
  const data = req.body
  findOneUser(data.email)
      .then(result => {
          if (result.userExists) {
              return res.status(401).json({
                  error: `L'adresse ${data.email} est déjà utilisée !`
              })
          } else {
              saveUser(data)
                  .then(newUserId => {
                      saveRole(newUserId, data.role)
                      .then(() => {
                        if(data.role !== 'manager'){
                          saveInClass(newUserId, data.className)
                          .then(() => {
                            res.status(201).json({
                              email: data.email,
                              password: data.password
                            })
                          })
                          .catch((error) => res.status(500).json({
                              error: error
                          }))
                        }else{
                          res.status(201).json({
                            email: data.email,
                            password: data.password
                          })
                        }
                    })
                    .catch((error) => res.status(500).json({
                        error: unavailableError
                    }))
                  })
                  .catch((error) => res.status(500).json({
                      error: unavailableError
                  }))
          }
      })
      .catch(() => res.status(500).json({
          error: unavailableError
      }))
}

// Find a single User with an id
exports.signin = (req, res) => {
  const unavailableError = 'Le serveur est temporairement  indisponible !'
  const data = req.body
  db.Users.findOne({ where: { email: data.email } })
    .then(user => {
      if (user) {
        //So Hash password
        bcrypt
          .compare(data.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' })
            }
            db.Roles.findOne({ where: { userId: user.id } })
              .then((userRole) => {
                return res.status(200).json({
                  userId: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  role: userRole.role,
                  email: user.email,
                  date_of_birth: user.date_of_birth.toLocaleDateString(),
                  accessToken: jwt.sign({ userId: user._id }, 'secret', {
                    expiresIn: '24h'
                  })
                })
              })
              .catch(() =>
                res
                  .status(500)
                  .json({ error: unavailableError })
              )
          })
          .catch(() =>
            res
              .status(500)
              .json({ error: unavailableError })
          )
      } else {
        res.status(404).json({
          error: `Impossible de trouver l'utlisateur avec l'adresse : \r ${data.email}.`
        })
      }
    })
    .catch(() =>
      res.status(500).json({
        error: unavailableError
      })
    )
}

//Save a user in users table
function saveUser(data) {
 return new Promise((resolve, reject) => {
   //Crypting user password before save
   bcrypt
   .hash(data.password, 10)
   .then(hash => {
     // Save User in the database
     console.log( data.date_of_birth);
     const date_birth = data.date_of_birth
     db.Users.create(
       {
         firstName: data.firstName,
         lastName: data.lastName,
         email: data.email,
         password: hash,
         date_of_birth: new Date(date_birth)
       }
     )
     .then(newUser => resolve(newUser.id))
     .catch(error => reject(`Echec création utilisateur : ${error}`))
   })
   .catch(error => reject(`Echec décryptage mot de passe : ${error}`))
 })
}

//save user'srole in roles table
function saveRole(newUserId, newUserRole) {
  return new Promise((resolve, reject) => {
      db.Roles.create({
              userId: newUserId,
              role: newUserRole
          })
          .then(() => resolve('Création role réussie'))
          .catch(error => {
            reject(`Echec création role : ${error}`)
          })
  })
}

//Find a user in users table by his email
function findOneUser(email) {
  return new Promise((resolve, reject) =>{
    db.Users.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        resolve({user: user, userExists: true})
      } else {
        resolve({user: null, userExists: false})
      }
    })
    .catch((error) => reject(error))
  }) 
}

//save user in UserClasses table
function saveInClass(_userId, _className) {
  return new Promise((resolve, reject) => {
      db.UserClasses.create({
              userId: _userId,
              className: _className
          })
          .then(() => resolve('affectation classe réussie'))
          .catch(error => {
            reject(`Echec affectation classe : ${error}`)
          })
  })
}

