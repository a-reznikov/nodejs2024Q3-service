import { Injectable } from '@nestjs/common';
import { Fav } from './entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class FavsService {
  private readonly favorites: Fav = {
    albums: [],
    artists: [],
    tracks: [],
  };

  async findAll() {
    return this.favorites;
  }

  async addTrack(track: Track) {
    return this.favorites.tracks.push(track);
  }

  async addAlbum(album: Album) {
    return this.favorites.albums.push(album);
  }

  async addArtist(artist: Artist) {
    return this.favorites.artists.push(artist);
  }

  async remove(id: number) {
    return `Delete`;
  }
}
