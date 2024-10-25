import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from './course.model';

@Entity()
export class Teacher extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: String;

    @Column()
    firstName: String;

    @Column()
    lastName: String;

    @Column()
    email: String;

    @Column()
    profession: String;

    @Column()
    phone: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Course, (course) => course.teacher)
    courses: Course[]
}