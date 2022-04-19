import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    employee_id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    office: string;

    @Column()
    birthday: string;

    @Column()
    situation: string;
}