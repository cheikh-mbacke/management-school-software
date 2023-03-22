const express = require('express');
const router = express.Router();
const classCtl = require('../controllers/class.controller');
const auth = require('../middleware/auth')

router.get('/getClasses', classCtl.getClasses);
router.post('/userClasses', classCtl.getUserClasses);
router.post('/studentClass', classCtl.getStudentClass);
router.post('/affect', classCtl.affectClass);
router.post('/add', classCtl.addClass);
router.delete('/delete', classCtl.deleteClass);

module.exports = router;