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
            });

        await request(app.getHttpServer())
            .post(path)
            .send({
                name: 'Adson Sousa',
                cpf: '30022745009',
                office: 'vendedor',
                birthday: '2002/03/27'
            });
    });

    afterEach(async () => {
        await employeeRepository.query('DELETE FROM employees');
    });

    it('should return a list of employees', async () => {
        const result = await request(app.getHttpServer())
            .get(path);

        expect(result.statusCode).toBe(200);
        expect(result.body).toStrictEqual([
            {
                employee_id: 1,
                name: 'Adson Sousa',
                cpf: '223.258.290-65',
                office: 'vendedor',
                birthday: '2002/03/27',
                situation: 'activate'
            },
            {
                employee_id: 2,
                name: 'Adson Sousa',
                cpf: '300.227.450-09',
                office: 'vendedor',
                birthday: '2002/03/27',
                situation: 'activate'
            }
        ]);
    });
});