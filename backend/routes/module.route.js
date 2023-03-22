const express = require('express');
const router = express.Router();
const moduleCtl = require('../controllers/module.controller');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.get('/', moduleCtl.getModules);
router.post('/userModules', moduleCtl.getUserModules);
router.post('/teacherModules', moduleCtl.getTeachersModules);
router.post('/studentModules', moduleCtl.getStudentModules);
router.post('/affect', moduleCtl.affectModule);
router.post('/add', moduleCtl.addModule);
router.post('/addRessource', multer, moduleCtl.addRessource);
router.post('/getRessources', moduleCtl.getRessources);
router.delete('/delete', moduleCtl.deleteModule);

module.exports = router;