import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlphanumeric, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";
export class CreateEmployeeDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @MinLength(11)
    @IsAlphanumeric()
    @IsNotEmpty()
    readonly cpf: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    @IsIn(['gerente', 'vendedor', 'caixa'])
    @IsNotEmpty()
    readonly office: string;

    @ApiProperty()
    @Type(() => Date)
    @IsNotEmpty()
    birthday: Date;
}