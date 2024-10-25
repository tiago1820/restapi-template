import { Request, Response } from "express";
import { Course } from "../models/course.model";
import { Teacher } from "../models/teacher.model";
import { Student } from "../models/student.model";

class CoursesController {

    async index(req: Request, res: Response) {
        try {
            const data = await Course.find({ relations: { teacher: true, students: true } });
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }

    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Course.findOne({ where: { id: Number(id) }, relations: { teacher: true, students: true } });
            if (!registro) {
                throw new Error('Curso no encontrado');
            }

            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { teacher } = req.body;

            if (!teacher || isNaN(Number(teacher))) {
                throw new Error('El ID del profesor es inválido');
            }

            const result = await Teacher.findOneBy({ id: Number(teacher) });
            if (!result) {
                throw new Error('Profesor no encontrado');
            }

            const registro = await Course.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            console.log("AQUI", err);

            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const { teacher } = req.body;

            const result = await Teacher.findOneBy({ id: Number(teacher) });
            if (!result) {
                throw new Error('Profesor no encontrado');
            }

            const registro = await Course.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Curso no encontrado');
            }
            await Course.update({ id: Number(id) }, req.body);
            const registroActualizado = await Course.findOne({ where: { id: Number(id) }, relations: { teacher: true, students: true } });
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Course.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Curso no encontrado');
            }
            await Course.delete({ id: Number(id) });
            res.status(204);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async associateStudent(req: Request, res: Response) {
        
        try {
            const { student_id, course_id } = req.body;
            const student = await Student.findOneBy({ id: Number(student_id) });
            if (!student) {
                throw new Error('Estudiante no encontrado');
            }

            const course = await Course.findOne({
                where: { id: Number(course_id) },
                relations: ['students'],
            });

            if (!course) {
                throw new Error('Curso no encontrado');
            }

            if (course.students.some(existingStudent => existingStudent.id === student_id)) {
                throw new Error('El estudiante ya está asociado a este curso');
            }

            course.students.push(student);
            const registro = await Course.save(course);
            res.status(200).json(registro);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
}

export default new CoursesController();