const express = require('express');
const {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudentById,
    updateStudentById,
    addStudentToCourse,
    removeStudentToCourse
} = require('../controller/student.js');

const router = express.Router();
router.get('/',getAllStudents);
router.get('/:id',getStudentById);
router.post('/',createStudent);
router.delete('/:id',deleteStudentById);
router.put('/:id',updateStudentById);

router.post('/:id/courses/:code',addStudentToCourse);
router.delete('/:id/courses/:code',removeStudentToCourse);

module.exports = router;
