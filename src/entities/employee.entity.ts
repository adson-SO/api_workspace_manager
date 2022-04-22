import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    employee_id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    office: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP(6)' })
    birthday: Date;

    @Column()
    situation: string;

    constructor() {
        if(!this.situation) {
            this.situation = 'activate';
        }
    }
}