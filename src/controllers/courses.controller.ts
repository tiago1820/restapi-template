import { Request, Response } from "express";
import coursesService from '../services/courses.service';

class CoursesController {

    async index(req: Request, res: Response) {
        try {
            const data = await coursesService.index();
            if (data.length === 0) {
                res.status(200).json({ message: 'No courses found.' });
                return;
            }
            res.status(200).json(data);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }

    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await coursesService.show(Number(id));
            res.status(200).json(data);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async store(req: Request, res: Response) {
        const { teacher_id } = req.body;
        const course = req.body;

        if (!teacher_id || isNaN(Number(teacher_id))) {
            throw new Error("The teacher's ID is invalid.");
        }

        try {
            const data = await coursesService.store(Number(teacher_id), course);
            res.status(201).json(data);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async update(req: Request, res: Response) {
        const course = req.body;
        const { id: course_id } = req.params;
        const { teacher } = req.body;

        if (!teacher || isNaN(Number(teacher))) {
            throw new Error("The teacher's ID is invalid.");
        }

        try {
            const data = await coursesService.update(
                Number(teacher),
                Number(course_id), course);
            res.status(200).json(data);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const message = await coursesService.destroy(Number(id));
            res.status(200).json({ message });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            }
        }
    }

    async associateStudent(req: Request, res: Response) {
        const { student_id, course_id } = req.body;

        try {
            const data = await coursesService.associateStudent(Number(course_id), Number(student_id));
            res.status(200).json(data);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
}

export default new CoursesController();