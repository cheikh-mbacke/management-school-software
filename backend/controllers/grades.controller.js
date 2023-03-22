const db = require('../models')

exports.addGrade = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    const data = req.body
    db.Grades.findOne({
        where: {
            studentId: data.studentId,
            semestreValue: data.semestreValue,
            moduleName: data.moduleName,
            className: data.className
        }})
    .then(grade => {
        if (grade) {
            res.status(201).json({error: "Vous avez déjà attribué une note à cet (te) élève !"})
        }else{
            db.Grades.create({
                value: data.markValue,
                studentId: data.studentId,
                teacherId: data.teacherId,
                semestreValue: data.semestreValue,
                moduleName: data.moduleName,
                className: data.className
            })
            .then(() => res.status(201).json({message: 'Note ajoutée !'}))
            .catch(() => res.status(500).json({error: unavailableError}))
        }
    })
    .catch(() => res.status(500).json({error: unavailableError}))
}

exports.deleteGrade = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    const data = req.body
    console.log(data);
    db.Grades.findOne({
        where: {
            value: data.markValue,
            studentId: data.studentId,
            teacherId: data.teacherId,
            semestreValue: data.semestreValue,
            moduleName: data.moduleName,
            className: data.className
        }})
    .then(grade => {
        if (grade) {
            db.Grades.destroy({
                where: {
                    value: data.markValue,
                    studentId: data.studentId,
                    teacherId: data.teacherId,
                    semestreValue: data.semestreValue,
                    moduleName: data.moduleName,
                    className: data.className
                }
            })
            .then(() => res.status(201).json({message: 'Note supprimée !'}))
            .catch((error) =>res.status(404).json({error: unavailableError }))
            
        }else{
            res.status(404).json({error: "cette note n'existe pas !"})
        }
    })
    .catch(() => (error) => console.log(error))
}

exports.updateGrade = (req, res) => {
    const unavailableError = 'Le serveur est temporairement  indisponible !'
    const data = req.body
    db.Grades.findOne({
        where: {
            value: data.oldValue,
            studentId: data.studentId,
            teacherId: data.teacherId,
            semestreValue: data.semestreValue,
            moduleName: data.moduleName,
            className: data.className
        }})
    .then(grade => {
        if (grade) {
            db.Grades.update(
                {
                    value: data.newValue
                },
                {where: {
                    value: data.oldValue,
                    studentId: data.studentId,
                    teacherId: data.teacherId,
                    semestreValue: data.semestreValue,
                    moduleName: data.moduleName,
                    className: data.className
                }}
            )
            .then(() => res.status(201).json({message: 'Note modifié !'}))
            .catch(() => res.status(500).json({error: unavailableError}))
            
        }else{
            res.status(404).json({error: "cette note n'existe pas !"})
        }
    })
    .catch(() => res.status(500).json({error: unavailableError}))
}

exports.getGrades = (req, res) => {
    const unavailableError = "le serveur est temporairement indisponible !"
      db.Grades.findAll({attributes: [
        'value', 'studentId', 
        'teacherId', 'semestreValue', 
        'moduleName', 'className'
    ]})
        .then(data => {
          res.status(200).json(data)
        })
        .catch(() =>
          res.status(500).json({ error: unavailableError })
        )
}


