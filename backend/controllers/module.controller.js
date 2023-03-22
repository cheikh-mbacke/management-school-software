const db = require('../models')
const sequelizeConfig = require("../config/sequelize.config");
exports.getModules = (req, res) => {
    const unavailableError = "le serveur est temporairement indisponible !"
      db.Modules.findAll({attributes: ['name']})
        .then(data => {
          res.status(200).json(data)
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.addModule = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    db.Modules.findOne({where: {name: req.body.moduleName}})
        .then(aModule => {
            if (aModule) {
                res.status(400).json({error: "Ce module existe déjà !"})
            }else{
                db.Modules.create({
                    name: req.body.moduleName
                })
                .then((addedModule) => res.status(201).json({moduleName: addedModule.name}))
                .catch(() => res.status(500).json({error: unavailableError}))
            }
        })
        .catch(() => res.status(500).json({error: unavailableError}))
}


exports.deleteModule = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    db.Modules.findOne({where: {name: req.body.moduleName}})
        .then(aModule => {
            if (aModule) {
                db.Modules.destroy({where: {name: req.body.moduleName}})
                .then(() => res.status(201).json({moduleName: aModule.name}))
                .catch((error) => console.log(error))
            }else{
                res.status(404).json({error: `Le module ${req.body.moduleName} n'existe pas !`}) 
            }
        })
        .catch(() => res.status(500).json({error: unavailableError}))
}

exports.affectModule = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    const data = req.body
    attributeModule(data.userId, data.moduleName, data.className)
    .then(affect => {
        if(!affect.error){
            res.status(201).json({message: affect.message})
        }else{
            res.status(201).json({error: affect.error}) 
        }
    })
    .catch(() =>res.status(500).json({ error: unavailableError }))
}

//save user in UserClasses table
function attributeModule(_userId, _moduleName, _className) {
    return new Promise((resolve, reject) => {
        db.UserModules.findOne({
            where: {
                moduleName: _moduleName,
                className: _className
            }})
        .then(module => {
            if (module) {
                resolve({error: "Ce module est déjà attribué !"})
            }else{
                db.UserModules.create({
                    userId: _userId,
                    moduleName: _moduleName,
                    className: _className
                })
                .then(() => resolve({message: 'Attribution module réussie !'}))
                .catch(error => {reject(`Echec attribution module : ${error}`)})
            }
        })
        .catch(error => reject(`Echec récupération du module : ${error}`))
    })
}

exports.getUserModules = (req, res) => {
    const unavailableError = "le serveur est temporairement indisponible !"
      db.UserModules.findAll({
        where: {userId: req.body.userId, className: req.body.className},
        attributes: ['moduleName']
    })
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ error: 'aucun module correspond !' }) 
            }else{
                res.status(200).json(data)
            }
            
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.getStudentModules = (req, res) => {
    console.log(req.body.className);
    const unavailableError = "le serveur est temporairement indisponible !"
      db.UserModules.findAll({
        where: {className: req.body.className},
        attributes: ['moduleName', 'userId']
    })
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ error: 'aucun module correspond !' }) 
            }else{
                res.status(200).json(data)
            }
            
        })
        .catch((error) =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.getTeachersModules = (req, res) => {
    const unavailableError = "le serveur est temporairement indisponible !"
      db.UserModules.findAll({
        where: {userId: req.body.userId},
        attributes: ['moduleName', 'className', 'userId']
    })
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ error: 'aucun module correspond !' }) 
            }else{
                res.status(200).json(data)
            }
            
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}

exports.addRessource = (req, res) => {

    const unavailableError = 'Le serveur est temporairement  indisponible !'

    db.Ressources.create({
        path: `${req.protocol}://${req.get('host')}/ressources/${req.file.filename}`,
        moduleName: req.body.moduleName,
        className: req.body.className,
        type: req.body.type,
        intitule: req.body.intitule,
        userId: req.body.userId
    })
    .then((addedModule) => res.status(201).json({moduleName: addedModule.moduleName}))
    .catch(() => res.status(500).json({error: unavailableError}))
    
}

exports.getRessources = (req, res) => {
    const unavailableError = "le serveur est temporairement indisponible !"
    
    let queryText = `
    SELECT firstName, lastName, className, intitule, path, type, moduleName, userId
    FROM ressources, users
    WHERE ressources.moduleName = '${req.body.moduleName}'
    AND ressources.userId = '${req.body.userId}'
    AND ressources.className = '${req.body.className}'
    AND users.id = ressources.userId
    AND ressources.userId IN (SELECT users.id FROM users
    INNER JOIN roles ON users.id = userId AND role = 'teacher')`
    sequelizeConfig.query(queryText)
        .then(data => {
            if (data[0].length == 0) {
                
                res.status(404).json({error: 'Aucune ressource trouvée'})  
            }else{
                console.log(data[0]);
                res.status(200).json(data[0])
            }

        })

        .catch((error) =>
        res.status(500).json(error)
        )
}

