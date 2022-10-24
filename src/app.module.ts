import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EmployeeModule } from './employee/employee.module';
import { BootstrapDataModule } from './bootstrap/bootstrap-data.module';
import { AgencyModule } from './agency/agency.module';
import {NoteModule} from "./note/note.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AgencyModule,
    BootstrapDataModule,
    EmployeeModule,
    NoteModule,
  ],
})
export class AppModule {}
