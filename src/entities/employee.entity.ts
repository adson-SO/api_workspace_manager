import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    employee_id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    cpf: string;

    @ApiProperty()
    @Column()
    office: string;

    @ApiProperty()
    @Column()
    birthday: Date;

    @ApiProperty()
    @Column()
    situation: string;

    constructor() {
        if(!this.situation) {
            this.situation = 'activate';
        }
    }
}