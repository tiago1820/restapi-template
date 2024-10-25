import express from 'express';
import studentsController from '../controllers/students.controller';
const router = express.Router();

router.get('/', studentsController.index);
router.post('/', studentsController.store);

router.route("/:id")
    .get(studentsController.show)
    .put(studentsController.update)
    .delete(studentsController.destroy);

export default router;