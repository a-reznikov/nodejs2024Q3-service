import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { findEntityById } from 'src/helpers/findEntity';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  async create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  async findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const foundedTrack = findEntityById<Track>(id, this.tracks);

    return foundedTrack;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `Updated track`;
  }

  remove(id: number) {
    return `Deleted`;
  }
}
