import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from '../dto/employees/create-employee.dto';
import { QueryEmployeeDto } from '../dto/employees/query-employee.dto';
import { UpdateEmployeeDto } from '../dto/employees/update-employee.dto';
import { Employee } from '../entities/employee.entity';
import { EmployeesService } from '../services/employees.service';

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
    async findOne(@Param('id') id: number): Promise<Employee> {
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
    async update(@Param('id') id: number, @Body() { name, cpf, office, birthday, situation }: UpdateEmployeeDto): Promise<Employee> {
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
    async delete(@Param('id') id: number): Promise<void> {
        return this.employeesService.delete(id);
    }
}
