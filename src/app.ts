import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import studentsRoutes from './routes/students.routes';
import teachersRoutes from './routes/teachers.routes';
import coursesRoutes from './routes/courses.routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    console.log('Hola mundo');
    res.send('Hola mundo');
});

app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/courses', coursesRoutes);

export default app;