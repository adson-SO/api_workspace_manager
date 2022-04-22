import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProduct1650652973067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'product_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'price',
                        type: 'float',
                        isNullable: false
                    },
                    {
                        name: 'employee_id',
                        type: 'int',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_products_employee',
                        columnNames: ['employee_id'],
                        referencedTableName: 'employees',
                        referencedColumnNames: ['employee_id']
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
