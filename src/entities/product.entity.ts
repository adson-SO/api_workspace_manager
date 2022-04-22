import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @Column()
    employee_id: number;
}