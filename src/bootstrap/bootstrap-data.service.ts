import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employee/employee.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from '@fast-csv/parse';

@Injectable()
export class BootstrapDataService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {
    this.insertData().then(() => console.log('Finished bootstrapping data.'));
  }

  async insertData(): Promise<void> {
    const employeeCount = await this.employeeRepository.count();
    if (employeeCount > 0) {
      console.log('No need to bootstrap');
    } else {
      console.log('Do the bootstrapping magic!');
      fs.createReadStream('./public-salaries.csv')
        .pipe(parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', async row => {
          try {
            const {
              Agency: agency,
              Employee: name,
              'Job Title': jobTitle,
              'Total Annual Amount': totalAnnualAmount,
              'Original Hire Date': originalHireDate,
              year = 2021,
            } = row;
            return await this.employeeRepository.save({
              agency,
              name,
              jobTitle,
              totalAnnualAmount,
              originalHireDate,
              year,
            });
          } catch (error) {
            console.log(error);
          }
        })
        .on('end', (rowCount: number) =>
          console.log(`Parsed ${rowCount} rows`),
        );
    }
  }
}
