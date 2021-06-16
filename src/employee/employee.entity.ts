import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  jobTitle: string;

  @Column()
  agency: string;

  @Column()
  totalAnnualAmount: string;

  @Column()
  year: number;

  @Column({ type: 'date' })
  originalHireDate: string;
}
