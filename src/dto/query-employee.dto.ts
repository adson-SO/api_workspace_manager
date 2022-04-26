import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, MinLength, IsIn, IsOptional, IsInt } from "class-validator";

export class QueryEmployeeDto {
    @ApiProperty({ required: false })
    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @MinLength(11)
    @IsOptional()
    readonly cpf?: string;

    @ApiProperty({ required: false })
    @IsString()
    @MinLength(5)
    @IsIn(['gerente', 'vendedor', 'caixa'])
    @IsOptional()
    readonly office?: string;

    @ApiProperty({ required: false })
    @Type(() => Date)
    @IsOptional()
    readonly birthday?: Date;

    @ApiProperty({ required: false })
    @IsString()
    @IsIn(['activate', 'deactivate'])
    @IsOptional()
    readonly situation?: string;
}