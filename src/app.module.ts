import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
