import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/employee.entity';
import { BootstrapDataService } from './bootstrap-data.service';
import { Agency } from '../agency/agency.entity';
import {Note} from "../note/note.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Agency, Employee, Note])],
  providers: [BootstrapDataService],
})
export class BootstrapDataModule {}
