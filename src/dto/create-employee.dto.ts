import { Type } from "class-transformer";
import { IsAlphanumeric, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MinLength(11)
    @IsAlphanumeric()
    @IsNotEmpty()
    readonly cpf: string;

    @IsString()
    @MinLength(5)
    @IsIn(['gerente', 'vendedor', 'caixa'])
    @IsNotEmpty()
    readonly office: string;

    @Type(() => Date)
    @IsNotEmpty()
    readonly birthday: Date;
}