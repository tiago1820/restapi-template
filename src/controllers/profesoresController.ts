import { Request, Response } from 'express';
import { Profesor } from '../models/profesoresModel';

class ProfesoresController {
    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
            const data = await Profesor.find();
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async consultarDetalle(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            res.status(200).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async ingresar(req: Request, res: Response) {
        try {
            const registro = await Profesor.save(req.body);
            res.status(201).json(registro);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async actualizar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            await Profesor.update({ id: Number(id) }, req.body);
            const registroActualizado = await Profesor.findOneBy({ id: Number(id) });
            res.status(200).json(registroActualizado);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async borrar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            await Profesor.delete({ id: Number(id) });
            res.send(204);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }
}

export default new ProfesoresController();