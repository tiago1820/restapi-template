import { Course } from "../models/course.model";
import { Teacher } from "../models/teacher.model";
import { Student } from "../models/student.model";

interface CourseType {
    name: string;
    description: string;
    teacher_id: number;
}

class CoursesService {

    async index() {
        try {
            const data = await Course.find({ relations: { teacher: true, students: true } });
            return data;
        } catch (error) {
            throw new Error('Error retrieving courses from the database.');
        }
    }

    async show(id: number) {
        try {
            const data = await Course.findOne({ where: { id: Number(id) }, relations: { teacher: true, students: true } });
            if (!data) {
                throw new Error(`Course with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving course with id ${id} from database.`);
        }
    }

    async store(course: CourseType) {

        try {
            const newCourse = Course.create(course);
            return newCourse.save();

        } catch (error) {
            throw new Error('Error saving the course to the database');
        }
    }

    async update(course_id: number, course: CourseType) {

        try {
            const existingCourse = await Course.findOneBy({ id: course_id });
            if (!existingCourse) {
                throw new Error('Course not found.');
            }

            await Course.update({ id: course_id }, course);
            return { ...existingCourse, ...course };

        } catch (error) {
            throw new Error('Error saving the course to the database');
        }
    }

    async destroy(id: number) {
        try {
            const existingCourse = await Course.findOneBy({ id });
            
            if (!existingCourse) {
                throw new Error('Course not found.');
            }
            await Course.remove(existingCourse);
            return `Course ${existingCourse.name} was deleted successfuly.`;

        } catch (error) {
            throw new Error('Error deleting a course in the database');
        }
    }

    async associateStudent(course_id: number, student_id: number) {
        try {
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
            const data = await Course.save(course);
            return data;

        } catch (error) {
            throw new Error('Error associating the student with the course');
        }
    }

    async associateTeacher(course_id: number, teacher_id: number) {
        try {
            const teacher = await Teacher.findOneBy({ id: teacher_id });
            if (!teacher) {
                throw new Error('Teacher not found.');
            }

            const course = await Course.findOne({
                where: { id: course_id },
                relations: ['teacher'],
            });

            if (!course) {
                throw new Error('Course not found.');
            }

            course.teacher = teacher;
            const data = await Course.save(course);
            return data;

        } catch (error) {
            throw new Error('Error associating the teacher with the course');
        }
    }

}

export default new CoursesService();