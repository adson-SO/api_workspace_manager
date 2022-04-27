import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { QueryProductDto } from '../dto/query-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';


@ApiTags('Products')
@Controller('api/v1/product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @ApiCreatedResponse({ type: Product })
    @ApiBadRequestResponse()
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

    @ApiOkResponse({ type: Product, isArray: true })
    @Get()
    async findAll(@Query() query: QueryProductDto): Promise<Product[]> {
        const result = await this.productsService.findAll(query);

        return result;
    }
}
