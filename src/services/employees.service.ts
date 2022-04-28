import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from '../dto/employees/create-employee.dto';
import { QueryEmployeeDto } from '../dto/employees/query-employee.dto';
import { UpdateEmployeeDto } from '../dto/employees/update-employee.dto';
import { Employee } from '../entities/employee.entity';
import { Like, Repository } from 'typeorm';
import { Helpers } from '../helpers/helpers';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) { }

    async create({ name, cpf, office, birthday }: CreateEmployeeDto): Promise<Employee> {
        const isCpfValid = Helpers.validateCpf(cpf);
        if (isCpfValid === false) {
            throw new BadRequestException('Invalid CPF');
        }

        const cpfExists = await this.employeesRepository.findOne({ cpf: cpf });
        if (cpfExists) {
            throw new BadRequestException('CPF already exists');
        }

        const isOver18 = Helpers.ageValidator(birthday);
        if (isOver18 === false) {
            throw new BadRequestException('You must be over 18 years old');
        }

        const employee = this.employeesRepository.create({ name, cpf, office, birthday });
        await this.employeesRepository.save(employee);

        const result = Helpers.formatCpf(employee);

        return result;
    }

    async findAll(query: QueryEmployeeDto): Promise<Employee[]> {
        if (Object.keys(query).length === 0) {
            query = {};
        }

        if (query.name) {
            Object.assign(query, { name: Like('%' + query.name + '%') })
        }

        const employees = await this.employeesRepository.find({
            where: query
        });

        const result = employees.map(employee => Helpers.formatCpf(employee));

        return result;
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeesRepository.findOne(id);

        if (!employee) {
            throw new NotFoundException();
        }

        const result = Helpers.formatCpf(employee);

        return result;
    }

    async update(id: number, { name, cpf, office, birthday, situation }: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeesRepository.findOne(id);
        if (!employee) {
            throw new NotFoundException();
        }

        if (cpf) {
            const isCpfValid = Helpers.validateCpf(cpf);
            if (isCpfValid === false) {
                throw new BadRequestException('Invalid CPF');
            }

            const cpfExists = await this.employeesRepository.findOne({ cpf: cpf });
            if (cpfExists) {
                throw new BadRequestException('CPF already exists');
            }
        }

        if (birthday) {
            const isOver18 = Helpers.ageValidator(birthday);
            if (!isOver18) {
                throw new BadRequestException('You must be over 18 years old');
            }
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

    async delete(id: number): Promise<void> {
        await this.employeesRepository.delete(id);
    }
}
