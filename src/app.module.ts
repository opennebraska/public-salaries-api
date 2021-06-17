import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EmployeeModule } from './employee/employee.module';
import { BootstrapDataModule } from './bootstrap/bootstrap-data.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BootstrapDataModule,
    EmployeeModule,
  ],
})
export class AppModule {}
