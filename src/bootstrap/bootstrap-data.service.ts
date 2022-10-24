import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employee/employee.entity';
import { getManager, Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from '@fast-csv/parse';
import { Agency } from '../agency/agency.entity';
import {Note} from "../note/note.entity";

@Injectable()
export class BootstrapDataService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {
    this.insertData().then();
  }

  async insertData(): Promise<void> {
    const employeeCount = await this.employeeRepository.count();
    if (employeeCount > 0) {
      console.log('No need to bootstrap');
    } else {
      console.log('Do the bootstrapping magic!');
      fs.createReadStream('./public-salaries-2022.csv')
        .pipe(parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', async row => {
          try {
            let {
              Organization: organization,
              Employee: name,
              'Annual Base Salary': salary,
              Overtime: overtime,
              Agency: agency,
            } = row;
            const {
              'Job Title': jobTitle,
              'Original Hire Date': originalHireDate,
              year = 2022,
            } = row;
            if(organization === 'Lancaster County') {
              agency = agency.split('.')[1]
            }
            name = name.trim();
            salary = Number(salary.replace(/[^0-9\.-]+/g, ''));
            overtime = Number(overtime.replace(/[^0-9\.-]+/g, '')) || 0;
            // Currently zeroing out negative overtime
            overtime = Math.max(overtime, 0);
            organization = organization === "State Employees" ? "State of Nebraska": organization
            return await this.employeeRepository.save({
              agency,
              organization,
              name,
              jobTitle,
              salary,
              overtime,
              totalAnnualAmount: salary + overtime,
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
          this.insertNotes();
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
SELECT row_number() over (), employee.agency as name, employee.organization as organization, count(employee.name) as employeeCount, max(employee.salary) as topSalary,
       max(employee.overtime) as topOvertime, max(employee."totalAnnualAmount") as topPay, percentile_cont(0.5) within group ( order by employee."totalAnnualAmount" ) as medianPay,
       sum(employee.salary) as totalSalary, sum(employee.overtime) as totalOvertime, sum(employee."totalAnnualAmount") as totalPay, employee.year from employee group by employee.agency, employee.organization, employee.year;`,
      );
    }
  }

  async insertNotes(): Promise<void> {
    const notesCount = await this.noteRepository.count()
    if (notesCount > 0) {
      console.log('Notes already created');
    } else {
      const notes = [
        { organization: "Lancaster County", note: "Lancaster County full-time employees' base salary is calculated based on the information provided by the county clerk that full-time employees work 2080 hours per year."}
      ]
      await this.noteRepository.save(notes)
    }
  }
}
