import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Teacher } from './teacher.model';
import { Student } from "./student.model";

@Entity('courses')
export class Course extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    description: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Teacher, (teacher) => teacher.courses)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

    @ManyToMany(() => Student)
    @JoinTable({
        name: 'courses_students',
        joinColumn: { name: 'course_id' },
        inverseJoinColumn: { name: 'student_id' }
    })
    students: Student[];

}