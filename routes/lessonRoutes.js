const express = require('express');
const router = express.Router();
const { getAllLessons, getLessonById } = require('../src/controller/lesson.controller');

router.get('/', getAllLessons);

router.get('/:id', getLessonById);

module.exports = router;