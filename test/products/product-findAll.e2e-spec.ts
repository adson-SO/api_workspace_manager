import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmployeesModule } from '../../src/employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../src/entities/employee.entity';
import { Repository } from 'typeorm';
import { Product } from '../../src/entities/product.entity';
import { ProductsModule } from '../../src/products/products.module';

describe('EmployeeController (e2e)', () => {
    let app: INestApplication;
    let employeeRepository: Repository<Employee>;
    let productRepository: Repository<Product>;
    const path: string = '/api/v1/product';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                EmployeesModule,
                ProductsModule,
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [Product, Employee],
                    logging: true,
                    synchronize: true
                })
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        employeeRepository = moduleFixture.get('EmployeeRepository');
        productRepository = moduleFixture.get('ProductRepository');
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await request(app.getHttpServer())
            .post('/api/v1/employee')
            .send({
                name: 'Adson Sousa',
                cpf: '12345678909',
                office: 'gerente',
                birthday: '2002/03/27'
            });

        await request(app.getHttpServer())
            .post(path)
            .send({
                name: 'Notebook Dell',
                category: 'Eletrônicos',
                price: 3000.50,
                employee_id: 1
            });

        await request(app.getHttpServer())
            .post(path)
            .send({
                name: 'Notebook Lenovo',
                category: 'Eletrônicos',
                price: 2000.75,
                employee_id: 1
            });
    });

    afterEach(async () => {
        await productRepository.query('DELETE FROM products');
    });

    it('should return a list of products', async () => {
        const result = await request(app.getHttpServer())
            .get(path);

        expect(result.statusCode).toBe(200);
        expect(result.body).toStrictEqual([
            {
                product_id: 1,
                name: 'Notebook Dell',
                category: 'Eletrônicos',
                price: 3000.50,
                employee_id: 1
            },
            {
                product_id: 2,
                name: 'Notebook Lenovo',
                category: 'Eletrônicos',
                price: 2000.75,
                employee_id: 1
            }
        ])
    })
});