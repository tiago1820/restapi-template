import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import studentsRoutes from './routes/students.routes';
import teachersRoutes from './routes/teachers.routes';
import coursesRoutes from './routes/courses.routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
    const data = {
        "students": "http://localhost:3000/api/students",
        "teaches": "http://localhost:3000/api/teaches",
        "courses": "http://localhost:3000/api/courses",
    }
    res.send(data);
});

app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/courses', coursesRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message, error: 'Internal server error' });
    } else {
        res.status(500).json({ message: 'Unknown error occurred', error: 'Internal server error' });
    }
});

export default app;