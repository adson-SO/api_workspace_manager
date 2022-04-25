import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { QueryProductDto } from 'src/dto/query-product.dto';
import { Product } from 'src/entities/product.entity';
import { ProductsService } from 'src/services/products.service';

@Controller('api/v1/product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async create(@Body() { name, category, price, employee_id }: CreateProductDto): Promise<Product> {
        const result = await this.productsService.create({ name, category, price, employee_id });

        return {
            product_id: result.product_id,
            name: result.name,
            category: result.category,
            price: result.price,
            employee_id: result.employee_id
        };
    }

    @Get()
    async findAll(@Query() query: QueryProductDto): Promise<Product[]> {
        const result = await this.productsService.findAll(query);

        return result;
    }
}