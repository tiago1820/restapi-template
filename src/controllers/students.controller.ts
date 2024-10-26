import { Request, Response } from 'express';
import studentsService from '../services/students.service';

class StudentsController {

    async index(req: Request, res: Response) {

        try {
            const data = await studentsService.index();
            if (data.length === 0) {
                res.status(200).json({ message: 'No characters found.' });
                return;
            }
            res.status(200).json(data);

        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await studentsService.show(Number(id));
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const data = await studentsService.store(req.body);
            res.status(201).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await studentsService.update(Number(id), req.body);
            res.status(200).json(data);

        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const message = await studentsService.destroy(Number(id));
            res.status(200).json({ message });
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }
}

export default new StudentsController();