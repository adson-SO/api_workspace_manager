import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { EmployeesService } from 'src/services/employees.service';

@Controller('api/v1/employee')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    async create(@Body() payload: CreateEmployeeDto): Promise<Employee> {
        const result = await this.employeesService.create(payload);

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
