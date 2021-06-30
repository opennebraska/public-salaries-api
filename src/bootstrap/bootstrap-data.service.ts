import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employee/employee.entity';
import { getManager, Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from '@fast-csv/parse';
import { Agency } from '../agency/agency.entity';

@Injectable()
export class BootstrapDataService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
  ) {
    this.insertData().then();
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
              totalAnnualAmount: Number(
                totalAnnualAmount.replace(/[^0-9\.-]+/g, ''),
              ),
              originalHireDate,
              year,
            });
          } catch (error) {
            console.log(error);
          }
        })
        .on('end', (rowCount: number) => {
          console.log(`Parsed ${rowCount} employees`);
          this.insertAgencyData();
        });
    }
  }

  async insertAgencyData(): Promise<void> {
    const agencyCount = await this.agencyRepository.count();
    if (agencyCount > 0) {
      console.log('Agencies already created');
    } else {
      await getManager().query(
        `INSERT INTO agency
SELECT row_number() over (), employee.agency as name, count(employee.name) as employeeCount, max(employee."totalAnnualAmount") as topPay,
       percentile_cont(0.5) within group ( order by employee."totalAnnualAmount" ) as medianPay, employee.year from employee group by employee.agency, employee.year;`,
      );
    }
  }
}
