const db = require('../models')

exports.getClasses = (req, res) => {
    const unavailableError = "le serveur est temporairement indisponible !"
      db.Classes.findAll({attributes: ['name']})
        .then(data => {
          res.status(200).json(data)
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.getUserClasses = (req, res) => {
    console.log(req.body);
    const unavailableError = "le serveur est temporairement indisponible !"
      db.UserClasses.findAll({
        attributes: ['className'],
        where: {userId: req.body.userId}
    })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.getStudentClass = (req, res) => {
    console.log(req.body);
    const unavailableError = "le serveur est temporairement indisponible !"
      db.UserClasses.findOne({
        attributes: ['className'],
        where: {userId: req.body.userId}
    })
        .then(data => {
          if (data) {
            res.status(200).json(data)
          } else {
            res.status(404).json({error: 'aucune classe trouvé'})
          }
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.addClass = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    db.Classes.findOne({where: {name: req.body.className}})
        .then(aClass => {
            if (aClass) {
                res.status(400).json({error: "cette classe existe déjà"})
            }else{
                db.Classes.create({
                    name: req.body.className
                })
                .then((addedClass) => res.status(201).json({className: addedClass.name}))
                .catch(() => res.status(500).json({error: unavailableError}))
            }
        })
        .catch(() => res.status(500).json({error: unavailableError}))
}

exports.deleteClass = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    db.Classes.findOne({where: {name: req.body.className}})
        .then(aClass => {
            if (aClass) {
                db.Classes.destroy({where: {name: req.body.className}})
                .then(() => res.status(201).json({className: aClass.name}))
                .catch(() => res.status(500).json({error: unavailableError}))
            }else{
                res.status(404).json({error: `La classe ${req.body.className} n'existe pas !`}) 
            }
        })
        .catch(() => res.status(500).json({error: unavailableError}))
}

exports.affectClass = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    saveInClass(req.body.userId, req.body.className)
    .then(affect => {
        if(!affect.error){
            res.status(201).json({message: affect.message})
        }else{
            res.status(201).json({error: affect.error}) 
        }
    })
    .catch((error) => console.log(error))
}

//save user in UserClasses table
function saveInClass(_userId, _className) {
    return new Promise((resolve, reject) => {
        db.UserClasses.findOne({where: {userId: _userId,className: _className}})
        .then(user => {
            if (user) {
                resolve({error: "Cet (e) enseignant (e) est déjà affecté (e) à cette classe !"})
            }else{
                db.UserClasses.create({
                    userId: _userId,
                    className: _className
                })
                .then(() => resolve({message: 'Affectation réussie !'}))
                .catch(error => {reject(`Echec affectation classe : ${error}`)})
            }
        })
        .catch(error => reject(`Echec récupération de l'enseignant : ${error}`))
    })
}