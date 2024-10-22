import { Request, Response } from 'express';

class EstudiantesController {
    constructor() {

    }

    consultar(req: Request, res: Response) {
        try {
            res.send('Consultar estudiantes');
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    consultarDetalle(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.send('Consultar detaller');
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    ingresar(req: Request, res: Response) {
        try {
            res.send('Ingresar');
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    actualizar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.send('Actualizar');
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    borrar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.send('Consultar');
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }
}

export default new EstudiantesController();