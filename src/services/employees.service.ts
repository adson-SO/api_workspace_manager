import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';

type EmployeeCreateRequest = {
    name: string,
    cpf: string,
    office: string,
    birthday: string
};

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {}

    async create({ name, cpf, office, birthday }: EmployeeCreateRequest): Promise<Employee> {
        const result = this.employeesRepository.create({ name, cpf, office, birthday });

        await this.employeesRepository.save(result);

        return result;
    }
}
