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
                throw new Error('Course not found.');
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
                throw new Error("The teacher's ID is invalid.");
            }

            const result = await Teacher.findOneBy({ id: Number(teacher) });
            if (!result) {
                throw new Error('Teacher not found.');
            }

            const registro = await Course.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
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
                throw new Error('Teacher not found.');
            }

            const registro = await Course.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Course not found.');
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
                throw new Error('Course not found.');
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
                throw new Error('Student not found.');
            }

            const course = await Course.findOne({
                where: { id: Number(course_id) },
                relations: ['students'],
            });

            if (!course) {
                throw new Error('Course not found.');
            }

            if (course.students.some(existingStudent => existingStudent.id === student_id)) {
                throw new Error('The student is already enrolled in this course.');
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