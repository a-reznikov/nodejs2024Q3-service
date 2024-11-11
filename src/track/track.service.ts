import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    return 'Create track';
  }

  async findAll() {
    return this.tracks;
  }

  findOne(id: number) {
    return `FindOne track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `Updated track`;
  }

  remove(id: number) {
    return `Deleted`;
  }
}
