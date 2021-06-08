import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  jobTitle: string;

  @Column()
  agency: string;

  @Column()
  totalAnnualAmount: number;

  @Column({ type: 'date' })
  originalHireDate: string;
}
