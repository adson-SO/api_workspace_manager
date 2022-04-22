import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
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
    async findAll(@Query() query: any): Promise<Employee[]> {
        const result = await this.employeesService.findAll(query);

        return result.map(employee => employee = {
            employee_id: employee.employee_id,
            name: employee.name,
            cpf: employee.cpf,
            office: employee.office,
            birthday: employee.birthday,
            situation: employee.situation
        });
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
}
