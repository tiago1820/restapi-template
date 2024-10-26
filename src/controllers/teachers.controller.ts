import { Request, Response } from 'express';
import { Teacher } from '../models/teacher.model';
import teachersService from '../services/teachers.service';

class TeachersController {

    async index(req: Request, res: Response) {
        try {
            const data = await teachersService.index();
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await teachersService.show(Number(id));
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const data = await teachersService.store(req.body);
            res.status(201).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await teachersService.update(Number(id), req.body);
            res.status(200).json(data);

        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const message = await teachersService.destroy(Number(id));
            res.status(200).json({ message });

        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }
}

export default new TeachersController();