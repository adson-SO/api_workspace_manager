import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { QueryEmployeeDto } from 'src/dto/query-employee.dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { EmployeesService } from 'src/services/employees.service';

@ApiTags('Employees')
@Controller('api/v1/employee')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @ApiCreatedResponse({ type: Employee })
    @ApiBadRequestResponse()
    @Post()
    async create(@Body() { name, cpf, office, birthday }: CreateEmployeeDto): Promise<Employee> {
        const result = await this.employeesService.create({
            name,
            cpf,
            office,
            birthday
        });

        return {
            employee_id: result.employee_id,
            name: result.name,
            cpf: result.cpf,
            office: result.office,
            birthday: result.birthday,
            situation: result.situation
        };
    }

    @ApiOkResponse({ type: Employee, isArray: true })
    @Get()
    async findAll(@Query() query: QueryEmployeeDto): Promise<Employee[]> {
        const result = await this.employeesService.findAll(query);

        return result.map(employee => employee = {
            employee_id: employee.employee_id,
            name: employee.name,
            cpf: employee.cpf,
            office: employee.office,
            birthday: employee.birthday,
            situation: employee.situation
        })
    }

    @ApiOkResponse({ type: Employee })
    @ApiNotFoundResponse()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Employee> {
        const result = await this.employeesService.findOne(id);

        return {
            employee_id: result.employee_id,
            name: result.name,
            cpf: result.cpf,
            office: result.office,
            birthday: result.birthday,
            situation: result.situation
        };
    }

    @ApiOkResponse({ type: Employee })
    @ApiBadRequestResponse()
    @ApiNotFoundResponse()
    @Put(':id')
    async update(@Param('id') id: string, @Body() { name, cpf, office, birthday, situation }: UpdateEmployeeDto): Promise<Employee> {
        const result = await this.employeesService.update(id, { name, cpf, office, birthday, situation });

        return {
            employee_id: result.employee_id,
            name: result.name,
            cpf: result.cpf,
            office: result.office,
            birthday: result.birthday,
            situation: result.situation
        };
    }

    @ApiNoContentResponse({ description: 'If the opereation was successful the response will be an empty body' })
    @ApiNotFoundResponse()
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<void> {
        return this.employeesService.delete(id);
    }
}
