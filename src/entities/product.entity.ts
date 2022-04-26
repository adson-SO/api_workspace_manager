import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    product_id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    category: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty()
    @Column()
    employee_id: number;
}