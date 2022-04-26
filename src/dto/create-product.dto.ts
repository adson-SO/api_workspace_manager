import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    employee_id: number;
}