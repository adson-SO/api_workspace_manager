import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';
import { Helpers } from '../helpers/helpers';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {}

    async create(payload: CreateEmployeeDto): Promise<Employee> {
        const isCpfValid = Helpers.validateCpf(payload.cpf);

        if(isCpfValid === false) {
            throw new BadRequestException('Invalid CPF');
        }

        const employee = this.employeesRepository.create(payload);

        await this.employeesRepository.save(employee);

        const result = Helpers.formatCpf(employee);

        return result;
    }
}
