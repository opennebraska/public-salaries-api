import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/employee.entity';
import { BootstrapDataService } from './bootstrap-data.service';
import { Agency } from '../agency/agency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agency, Employee])],
  providers: [BootstrapDataService],
})
export class BootstrapDataModule {}
