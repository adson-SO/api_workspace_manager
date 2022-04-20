import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {}

    async create(payload: CreateEmployeeDto): Promise<Employee> {
        const result = this.employeesRepository.create(payload);

        await this.employeesRepository.save(result);

        return result;
    }
}
