import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';
import { Helpers } from '../helpers/helpers';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {}

    async create({ name, cpf, office, birthday }: CreateEmployeeDto): Promise<Employee> {
        const isCpfValid = Helpers.validateCpf(cpf);
        if(isCpfValid === false) {
            throw new BadRequestException('Invalid CPF');
        }

        const cpfExists = await this.employeesRepository.findOne({ cpf: cpf });
        if(cpfExists) {
            throw new BadRequestException('CPF already exists');
        }

        const employee = this.employeesRepository.create({ name, cpf, office, birthday });
        await this.employeesRepository.save(employee);

        const result = Helpers.formatCpf(employee);

        return result;
    }

    async findAll(query: any): Promise<Employee[]> {
        if(Object.keys(query).length === 0) {
            query = {};
        }

        const employees = await this.employeesRepository.find(query);

        const result = employees.map(employee => Helpers.formatCpf(employee));

        return result;
    }

    async findOne(id: string): Promise<Employee> {
        const employee = await this.employeesRepository.findOne(id);

        if(!employee) {
            throw new NotFoundException();
        }

        const result = Helpers.formatCpf(employee);

        return result;
    }

    async update(id: string, { name, cpf, office, birthday, situation }: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeesRepository.findOne(id);
        if(!employee) {
            throw new NotFoundException();
        }

        const isCpfValid = Helpers.validateCpf(employee.cpf);
        if(isCpfValid === false) {
            throw new BadRequestException('Invalid CPF');
        }

        employee.name = name ? name : employee.name;
        employee.cpf = cpf ? cpf : employee.cpf;
        employee.office = office ? office : employee.office;
        employee.birthday = birthday ? birthday : employee.birthday;
        employee.situation = situation ? situation : employee.situation;

        await this.employeesRepository.save(employee);

        const result = Helpers.formatCpf(employee);

        return result;
    }
}
