import { Request, Response } from 'express';
import { Teacher } from '../models/teacher.model';

class TeachersController {
    
    async index(req: Request, res: Response) {
        try {
            const data = await Teacher.find();
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Teacher.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Teacher not found.');
            }
            res.status(200).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const registro = await Teacher.save(req.body);
            res.status(201).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Teacher.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Teacher not found.');
            }
            await Teacher.update({ id: Number(id) }, req.body);
            const registroActualizado = await Teacher.findOneBy({ id: Number(id) });
            res.status(200).json(registroActualizado);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Teacher.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Teacher not found.');
            }
            await Teacher.delete({ id: Number(id) });
            res.send(204);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }
}

export default new TeachersController();