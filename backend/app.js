const express = require('express');
const path = require('path');
const helmet = require('helmet');
const authRoutes = require('./routes/auth.route');
const usersRoutes = require('./routes/users.route');
const classRoutes = require('./routes/class.route');
const moduleRoutes = require('./routes/module.route');
const gradeRoutes = require('./routes/grades.route');
const timeTableRoutes = require('./routes/timetable.route');


const app = express()

const db = require("./models");
db.sequelize.sync();

app.use(helmet());
/*Analyser les corps des requêtes entrantes
Comme la forme req.body est basée sur une entrée
contrôlée par l'utilisateur, toutes les propriétés
et valeurs de cet objet ne sont pas approuvées et
doivent être validées avant d'être approuvées*/
app.use(express.json());

//Configuration CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/videos', express.static(path.join(__dirname, 'videos')));
  app.use('/ressources', express.static(path.join(__dirname, 'ressources')));

//requêtes d'authentification
app.use('/api/auth', authRoutes);

app.use('/api/users', usersRoutes);
app.use('/api/class', classRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/timetable', timeTableRoutes);

module.exports = app

