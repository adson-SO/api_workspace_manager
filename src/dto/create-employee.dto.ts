import { Type } from "class-transformer";
import { IsAlphanumeric, IsDate, IsDefined, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @MinLength(3)
    @IsDefined()
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
    birthday: string;
}