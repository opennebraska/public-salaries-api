import {NoteService} from "./note.service";
import {Controller, Get, Param} from "@nestjs/common";
import {Note} from "./note.entity";

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/:organization')
  async find(@Param('organization') organization: string): Promise<Note[]> {
    return this.noteService.findByOrganization(organization);
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }
}