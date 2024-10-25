import express from 'express';
import teachersController from '../controllers/teachers.controller';
const router = express.Router();

router.get('/', teachersController.index);
router.post('/', teachersController.store);

router.route('/:id')
    .get(teachersController.show)
    .put(teachersController.update)
    .delete(teachersController.destroy);

export default router;