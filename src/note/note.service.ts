import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Note} from "./note.entity";
import {Repository} from "typeorm";

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findByOrganization(organization: string): Promise<Note[]> {
    return this.noteRepository.find({ where: { organization}})
  }

  findAll(): Promise<Note[]> {
    return this.noteRepository.find()
  }
}