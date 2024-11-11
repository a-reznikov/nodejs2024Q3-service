import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { findEntityById } from 'src/helpers/findEntity';
import { removeEntityById } from 'src/helpers/removeEntity';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  async findAll() {
    return this.albums;
  }

  async findOne(id: string) {
    const foundedAlbum = await findEntityById<Album>('Album', id, this.albums);

    return foundedAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const foundedAlbum = await this.findOne(id);

    foundedAlbum.name = updateAlbumDto.name || foundedAlbum.name;
    foundedAlbum.year = updateAlbumDto.year || foundedAlbum.year;
    foundedAlbum.artistId = updateAlbumDto.artistId || foundedAlbum.artistId;

    return foundedAlbum;
  }

  async remove(id: string) {
    return await removeEntityById('Album', id, this.albums);
  }
}
