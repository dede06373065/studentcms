const express = require('express');
const routeStudent = require('./student');
const routeCourse = require('./course');

const router = express.Router();

router.use('/students',routeStudent);
router.use('/courses',routeCourse);

module.exports = router;