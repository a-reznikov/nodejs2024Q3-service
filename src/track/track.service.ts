import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { findEntityById } from 'src/helpers/findEntity';
import { removeEntityById } from 'src/helpers/removeEntity';

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

  async findOne(id: string) {
    const foundedTrack = await findEntityById<Track>('Track', id, this.tracks);

    return foundedTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const foundedTrack = await this.findOne(id);

    foundedTrack.name = updateTrackDto.name || foundedTrack.name;
    foundedTrack.duration = updateTrackDto.duration || foundedTrack.duration;
    foundedTrack.artistId = updateTrackDto.artistId || foundedTrack.artistId;
    foundedTrack.albumId = updateTrackDto.albumId || foundedTrack.albumId;

    return foundedTrack;
  }

  async remove(id: string) {
    return await removeEntityById('Track', id, this.tracks);
  }
}
