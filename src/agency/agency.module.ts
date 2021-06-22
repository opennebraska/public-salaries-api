import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Agency])],
  providers: [AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
