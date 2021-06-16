import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/employee.entity';
import { BootstrapDataService } from './bootstrap-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [BootstrapDataService],
})
export class BootstrapDataModule {}
