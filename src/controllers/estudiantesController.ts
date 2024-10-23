import { Request, Response } from 'express';
import { Estudiante } from '../models/estudiantesModel';

class EstudiantesController {
    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
            const data = await Estudiante.find();
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async consultarDetalle(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            res.status(200).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async ingresar(req: Request, res: Response) {
        try {
            const registro = await Estudiante.save(req.body);
            res.status(201).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async actualizar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await Estudiante.update({ id: Number(id) }, req.body);
            const registroActualizado = await Estudiante.findOneBy({ id: Number(id) });
            res.status(200).json(registroActualizado);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async borrar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await Estudiante.delete({ id: Number(id) });
            res.send(204);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }
}

export default new EstudiantesController();