import { Type } from "class-transformer";
import { IsString, MinLength, IsIn, IsOptional, IsInt } from "class-validator";

export class QueryEmployeeDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(11)
    @IsOptional()
    readonly cpf?: string;

    @IsString()
    @MinLength(5)
    @IsIn(['gerente', 'vendedor', 'caixa'])
    @IsOptional()
    readonly office?: string;

    @Type(() => Date)
    @IsOptional()
    readonly birthday?: Date;

    @IsString()
    @IsIn(['activate', 'deactivate'])
    @IsOptional()
    readonly situation?: string;
}