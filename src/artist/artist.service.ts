import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { findEntityById } from 'src/helpers/findEntity';
import { removeEntityById } from 'src/helpers/removeEntity';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  async create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  async findAll() {
    return this.artists;
  }

  async findOne(id: string) {
    const foundedArtist = await findEntityById<Artist>(
      'Artist',
      id,
      this.artists,
    );

    return foundedArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const foundedArtist = await this.findOne(id);

    foundedArtist.name = updateArtistDto.name || foundedArtist.name;
    foundedArtist.grammy = updateArtistDto.grammy ?? foundedArtist.grammy;

    return foundedArtist;
  }

  async remove(id: string) {
    return await removeEntityById('Artist', id, this.artists);
  }
}
