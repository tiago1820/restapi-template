import { Request, Response, NextFunction } from 'express';
import teachersService from '../services/teachers.service';

class TeachersController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await teachersService.index();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await teachersService.show(Number(id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await teachersService.store(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await teachersService.update(Number(id), req.body);
            res.status(200).json(data);

        } catch (error) {
            next(error);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const message = await teachersService.destroy(Number(id));
            res.status(200).json({ message });

        } catch (error) {
            next(error);
        }
    }
}

export default new TeachersController();