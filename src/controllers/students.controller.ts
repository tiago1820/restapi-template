import { Request, Response } from 'express';
import { Student } from '../models/student.model';

class StudentsController {
   
    async index(req: Request, res: Response) {
        try {
            const data = await Student.find();
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Student.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            res.status(200).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const registro = await Student.save(req.body);
            res.status(201).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Student.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await Student.update({ id: Number(id) }, req.body);
            const registroActualizado = await Student.findOneBy({ id: Number(id) });
            res.status(200).json(registroActualizado);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Student.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await Student.delete({ id: Number(id) });
            res.send(204);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }
}

export default new StudentsController();