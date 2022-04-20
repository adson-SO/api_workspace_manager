import { Type } from "class-transformer";
import { IsAlphanumeric, IsDate, IsDateString, IsDefined, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

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

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    birthday: Date;
}