import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/products/create-product.dto';
import { QueryProductDto } from '../dto/products/query-product.dto';
import { Employee } from '../entities/employee.entity';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(Employee) private employeesRepository: Repository<Employee>
    ) {}

    async create({ name, category, price, employee_id }: CreateProductDto): Promise<Product> {
        const employee = await this.employeesRepository.findOne(employee_id);

        if(!employee) {
            throw new NotFoundException('This employee does not exist');
        }
        
        if(employee.office !== 'gerente' || employee.situation !== 'activate') {
            throw new BadRequestException('You must be an active manager to register a new product');
        }

        const result = this.productsRepository.create({ name, category, price, employee_id });
        await this.productsRepository.save(result);
        
        return result;
    }

    async findAll(query: QueryProductDto): Promise<Product[]> {
        if(Object.keys(query).length === 0) {
            query = {};
        }

        const result = await this.productsRepository.find({
            where: query
        });

        return result;
    }
}
