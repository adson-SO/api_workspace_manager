import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createEmployee1650391639811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'employees',
                columns: [
                    {
                        name: 'employee_id',
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
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'office',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'birthday',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'situation',
                        type: 'varchar',
                        isNullable: false
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employees');
    }

}
