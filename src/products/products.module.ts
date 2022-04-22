import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from 'src/controllers/products.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { Employee } from 'src/entities/employee.entity';
import { Product } from 'src/entities/product.entity';
import { EmployeesService } from 'src/services/employees.service';
import { ProductsService } from '../services/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), TypeOrmModule.forFeature([Employee])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
