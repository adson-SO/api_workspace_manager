import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '../controllers/products.controller';
import { Employee } from '../entities/employee.entity';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), TypeOrmModule.forFeature([Employee])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
