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
  topPay: number;

  @Column()
  medianPay: number;

  @Column()
  year: number;
}
