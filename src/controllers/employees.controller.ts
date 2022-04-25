import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { QueryEmployeeDto } from 'src/dto/query-employee.dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { EmployeesService } from 'src/services/employees.service';

@Controller('api/v1/employee')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

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

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<void> {
        return this.employeesService.delete(id);
    }
}
