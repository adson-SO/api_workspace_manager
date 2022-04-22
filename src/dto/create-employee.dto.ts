import { Transform, Type } from "class-transformer";
import { IsAlphanumeric, IsDate, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(11)
    @IsAlphanumeric()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @MinLength(5)
    @IsIn(['gerente', 'vendedor', 'caixa'])
    @IsNotEmpty()
    office: string;

    @Type(() => Date)
    @IsNotEmpty()
    birthday: Date;
}