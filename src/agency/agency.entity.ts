import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  employeeCount: number;

  @Column()
  topSalary: number;

  @Column()
  topOvertime: number;

  @Column()
  topPay: number;

  @Column()
  medianPay: number;

  @Column()
  totalSalary: number;
  @Column()
  totalOvertime: number;
  @Column()
  totalPay: number;

  @Column()
  year: number;
}
