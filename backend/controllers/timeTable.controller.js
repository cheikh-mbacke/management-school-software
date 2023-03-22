const db = require('../models')
const sequelizeConfig = require("../config/sequelize.config");

exports.addSlot = (req, res) => {

    const unavailableError = 'Le serveur est temporairement  indisponible !'
    const data = req.body

    sequelizeConfig.query(`
    SELECT * FROM timetables 
    WHERE date = '${data.date}' AND teacherId = ${data.teacherId} AND className = '${data.className}' 
    AND ((startHour < ${data.startHour} AND endHour > ${data.startHour})
    OR (startHour = ${data.startHour} AND startMinute <= ${data.startMinute} AND endHour >= ${data.startHour})
    OR (startHour = ${data.startHour} AND endHour > ${data.startHour}) OR 
    (startHour < ${data.endHour} AND endHour > ${data.endHour}) OR (startHour < ${data.endHour}
    AND endHour = ${data.endHour} AND endMinute >= ${data.endMinute} ) OR (startHour < ${data.endHour}
    AND startMinute <= ${data.endMinute}  AND endHour = ${data.endHour}) OR (startHour < ${data.endHour}
    AND endHour = ${data.endHour} AND endMinute >= ${data.endMinute} ) OR 
    (startHour >= ${data.startHour} AND endHour <= ${data.endHour}
    AND startMinute >= ${data.startMinute}  AND endMinute <= ${data.endMinute}));
`)
    .then(timeSlot => {
        console.log(timeSlot);
        console.log(timeSlot[0].length);
        if (timeSlot[0].length !== 0) {
          return res.status(400).json({ error: 'Cette séance existe déjà dans la base de données' })
        }else{
            sequelizeConfig.query(`
            INSERT INTO timetables
            (startHour, startMinute, endHour, endMinute, date, className,
            moduleName, teacherId, descColor, description, classroom) VALUES (
            ${data.startHour}, ${data.startMinute}, ${data.endHour}, ${data.endMinute},
            '${data.date}', '${data.className}', '${data.moduleName}', ${data.teacherId}, 
            '${data.descColor}', '${data.description}', '${data.classroom}');`
            )
            .then(() => res.status(201).json({ message: 'Scéance de cours créée' }))
            .catch(() => res.status(201).json({ error: unavailableError }))
        }
    })
    .catch(() => res.status(201).json({ error: unavailableError }))
}

exports.deleteSlot = (req, res) => {
   const unavailableError = 'Le serveur est temporairement  indisponible !'
   const data = req.body
   
   sequelizeConfig.query(`
   SELECT * FROM timetables WHERE id = ${data.id} 
   `)
   .then(timeSlot => {
    if (timeSlot[0].length == 0) {
        return res.status(400).json({ error: "Cette séance n'existe pas !" })
      }else{
          sequelizeConfig.query(`DELETE FROM timetables WHERE id = ${data.id} `)
          .then(() => res.status(201).json({ message: 'Scéance de cours supprimée !' }))
          .catch(() => res.status(201).json({ error: unavailableError }))
      }
   })
   .catch(() => res.status(201).json({ error: unavailableError }))
}

exports.updateSlot = (req, res) => {
    
    const unavailableError = 'Le serveur est temporairement  indisponible !'
   const data = req.body
   
   sequelizeConfig.query(`
   SELECT * FROM timetables WHERE id = ${data.id} 
   `)
   .then(timeSlot => {
    if (timeSlot[0].length == 0) {
        return res.status(400).json({ error: "Cette séance n'existe pas !" })
      }else{
        sequelizeConfig.query(`
        UPDATE timetables SET startHour = ${data.startHour} , startMinute = ${data.startMinute}, endHour = ${data.endHour}, 
        endMinute = ${data.endMinute} , date = '${data.date}', className = '${data.className}',
        moduleName = '${data.moduleName}', teacherId = ${data.teacherId} WHERE id = ${data.id};
        `
        )
        .then(() => res.status(201).json({ message: 'Scéance de cours modifiée !' }))
        .catch(() => res.status(201).json({ error: unavailableError }))
      }
   })
   .catch(() => res.status(201).json({ error: unavailableError }))
}

exports.getSlots = (req, res) => {
    
   const unavailableError = 'Le serveur est temporairement  indisponible !'
   const data = req.body
   
   sequelizeConfig.query(`
   SELECT timetables.id as 'id', startHour, startMinute, endHour, endMinute, date,
   className, moduleName, descColor, description, teacherId, firstName, lastName FROM timetables
   INNER JOIN users ON teacherId = users.id
   WHERE date='${data.date}' ORDER BY startHour, date;
   `)
   .then(slots => {
    res.status(201).json(slots[0])
   })
   .catch((error) => res.status(201).json({ error: error }))
}

