const express = require('express');
const router = express.Router();
const usersCtl = require('../controllers/users.controller');
const auth = require('../middleware/auth')

router.put('/updatePass', usersCtl.updatePass);
router.get('/teachers', usersCtl.getTeachers);
router.get('/students', usersCtl.getStudents);
router.get('/teacherStudents', usersCtl.getTeacherStudents);
router.get('/students/:userId', usersCtl.getStudent);
module.exports = router;