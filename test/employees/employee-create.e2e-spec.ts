import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmployeesModule } from '../../src/employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../src/entities/employee.entity';
import { Repository } from 'typeorm';

describe('EmployeeController (e2e)', () => {
    let app: INestApplication;
    let employeeRepository: Repository<Employee>;
    const path: string = '/api/v1/employee';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                EmployeesModule,
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [Employee],
                    logging: true,
                    synchronize: true
                })
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        employeeRepository = moduleFixture.get('EmployeeRepository');
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await request(app.getHttpServer())
            .post(path)
            .send({
                name: 'Adson Sousa',
                cpf: '22325829065',
                office: 'vendedor',
                birthday: '2002/03/27'
            })
    })

    afterEach(async () => {
        await employeeRepository.query('DELETE FROM employees');
    });

    it('should register a new employee', async () => {
        const employee = {
            name: 'Adson Sousa',
            cpf: '12345678909',
            office: 'vendedor',
            birthday: '2002/03/27'
        };

        const result = await request(app.getHttpServer())
            .post(path)
            .send(employee);

        expect(result.statusCode).toBe(201);
        expect(result.body).toStrictEqual({
            employee_id: 2,
            name: 'Adson Sousa',
            cpf: '123.456.789-09',
            office: 'vendedor',
            birthday: '2002/03/27',
            situation: 'activate'
        });
    });

    it('should not register an employee with invalid cpf', async () => {
        const employee = {
            name: 'Adson Sousa',
            cpf: '12345678910',
            office: 'vendedor',
            birthday: '2002/03/27'
        };

        const result = await request(app.getHttpServer())
            .post(path)
            .send(employee);

        expect(result.statusCode).toBe(400);
    });

    it('should not register a new employee with a duplicated cpf', async () => {
        const employee = {
            name: 'Adson Sousa',
            cpf: '12345678909',
            office: 'vendedor',
            birthday: '2002/03/27'
        };

        await request(app.getHttpServer())
            .post(path)
            .send(employee);

        const result = await request(app.getHttpServer())
            .post(path)
            .send(employee);

        expect(result.statusCode).toBe(400);
    });

    it('should not register an employee who is under 18 years old', async () => {
        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);

        const employee = {
            name: 'Adson Sousa',
            cpf: '12345678909',
            office: 'vendedor',
            birthday: tomorrow
        };

        const result = await request(app.getHttpServer())
            .post(path)
            .send(employee);

        expect(result.statusCode).toBe(400);
    });
});