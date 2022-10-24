import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  organization: string;

  @Column()
  note: string;
}