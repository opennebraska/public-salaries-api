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

  @Column('float')
  totalAnnualAmount: number;

  @Column()
  year: number;

  @Column({ type: 'date' })
  originalHireDate: string;
}
