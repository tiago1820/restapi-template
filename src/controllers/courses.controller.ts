import { Request, Response, NextFunction } from "express";
import coursesService from '../services/courses.service';

class CoursesController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await coursesService.index();
            if (data.length === 0) {
                res.status(200).json({ message: 'No courses found.' });
                return;
            }
            res.status(200).json(data);

        } catch (error) {
            next(error);
        }

    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await coursesService.show(Number(id));
            res.status(200).json(data);

        } catch (error) {
            next(error);
        }
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        const course = req.body;

        try {
            const data = await coursesService.store(course);
            res.status(201).json(data);

        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const course = req.body;
        const { id: course_id } = req.params;

        try {
            const data = await coursesService.update(Number(course_id), course);
            res.status(200).json(data);

        } catch (error) {
            next(error);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const message = await coursesService.destroy(Number(id));
            res.status(200).json({ message });

        } catch (error) {
            next(error);
        }
    }

    async associateStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { student_id, course_id } = req.body;

        try {
            const data = await coursesService.associateStudent(Number(course_id), Number(student_id));
            res.status(200).json(data);

        } catch (error) {
            next(error);
        }
    }

    async associateTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { course_id, teacher_id } = req.body;

        try {
            const data = await coursesService.associateTeacher(Number(course_id), Number(teacher_id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

}

export default new CoursesController();