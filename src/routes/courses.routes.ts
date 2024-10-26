import express from 'express';
import coursesController from '../controllers/courses.controller';
const router = express.Router();

router.get('/', coursesController.index);

router.post('/', coursesController.store);
router.post('/associate', coursesController.associateStudent);

router.route('/:id')
    .get(coursesController.show)
    .put(coursesController.update)
    .delete(coursesController.destroy);

export default router;