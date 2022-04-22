import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    employee_id: number;
}