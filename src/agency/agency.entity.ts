import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AgencyType {
  CITY = 'CITY',
  COUNTY = 'COUNTY',
  UTILITY = 'UTILITY',
  OTHER = 'OTHER',
}

@Entity()
export class AgencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: AgencyType;

  @Column()
  employees: number;
}
