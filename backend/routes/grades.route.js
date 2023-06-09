const express = require('express');
const router = express.Router();
const gradeCtl = require('../controllers/grades.controller');
const auth = require('../middleware/auth')

router.post('/add', gradeCtl.addGrade);
router.delete('/delete', gradeCtl.deleteGrade);
router.put('/update', gradeCtl.updateGrade);
router.get('/getGrades', gradeCtl.getGrades);
router.post('/getStudentGrades', gradeCtl.getStudentGrades);
router.post('/getTeacherStudentsGrades', gradeCtl.getTeacherStudentsGrades)

module.exports = router;