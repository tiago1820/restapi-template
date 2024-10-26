import { Teacher } from "../models/teacher.model";

interface TeacherType {
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
    profession: string;
    phone: string
}

class TeachersService {

    async index() {
        try {
            const data = await Teacher.find();
            return data;
        } catch (error) {
            throw new Error('Error retrieving teachers from the database.');
        }
    }

    async show(id: number) {
        try {
            const data = await Teacher.findOneBy({ id });
            if (!data) {
                throw new Error(`Teacher with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving teacher with id ${id} from database.`);
        }
    }

    async store(teacher: TeacherType) {
        try {
            const newTeacher = Teacher.create(teacher);
            await newTeacher.save();
            return newTeacher;
        } catch (error) {
            throw new Error('Error saving the teacher to the database.');
        }
    }

    async update(id: number, body: TeacherType) {
        try {
            const teacher = await Teacher.findOneBy({ id });
            if (!teacher) {
                throw new Error('Teacher not found.');
            }
            await Teacher.update({ id }, body);
            return { ...teacher, ...body };

        } catch (error) {
            throw new Error('Error editing teacher in database');
        }
    }

    async destroy(id: number) {
        try {
            const teacher = await Teacher.findOneBy({ id });
            if (!teacher) {
                throw new Error('Teacher not found.');
            }
            await Teacher.remove(teacher);
            return `Teacher ${teacher.firstName} was deleted successfuly.`;
        } catch (error) {
            throw new Error('Error deleting a teacher in the database.');
        }
    }

}

export default new TeachersService();