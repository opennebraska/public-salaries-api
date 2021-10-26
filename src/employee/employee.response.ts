import { Employee } from './employee.entity';

export class EmployeeResponse {
  id: string;
  name: string;
  jobTitle: string;
  agency: string;
  totalAnnualAmount: string;
  year: number;
  originalHireDate: string;

  constructor(employee: Employee) {
    Object.assign(this, employee);
  }
}
