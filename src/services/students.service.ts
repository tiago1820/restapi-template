import { Student } from "../models/student.model";

interface StudentType {
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
}

class StudentsService {

    async index() {
        try {
            const data = await Student.find();
            return data;
        } catch (error) {
            throw new Error('Error retrieving students from the database.');
        }
    }

    async show(id: number) {
        try {
            const data = await Student.findOneBy({ id });
            if (!data) {
                throw new Error(`Student with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving student with id ${id} from database.`);
        }
    }

    async store(student: StudentType) {
        try {
            const newStudent = Student.create(student);
            await newStudent.save();
            return newStudent;
        } catch (error) {
            throw new Error('Error saving the student to the database');
        }
    }

    async update(id: number, body: StudentType) {

        try {
            const student = await Student.findOneBy({ id });
            if (!student) {
                throw new Error('Student not found.');
            }
            await Student.update({ id }, body);
            return { ...student, ...body };

        } catch (error) {
            throw new Error('Error editing student in database');
        }
    }

    async destroy(id: number) {
        try {
            const student = await Student.findOneBy({ id });
            if (!student) {
                throw new Error('Student not found.');
            }
            await Student.remove(student);
            return `Student ${student.firstName} was deleted successfuly.`;
        } catch (error) {
            throw new Error('Error deleting a student in the database');
        }
    }

}

export default new StudentsService();