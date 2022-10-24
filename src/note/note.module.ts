import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NoteService} from "./note.service";
import {NoteController} from "./note.controller";
import {Note} from "./note.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}