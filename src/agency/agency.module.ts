import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEntity } from './agency.entity';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEntity])],
  providers: [AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
