import { Injectable } from '@nestjs/common';
import { Fav } from './entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { removeEntityById } from 'src/helpers/removeEntity';

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

  async removeTrack(id: string) {
    return await removeEntityById('Track', id, this.favorites.tracks);
  }

  async removeAlbum(id: string) {
    return await removeEntityById('Album', id, this.favorites.albums);
  }

  async removeArtist(id: string) {
    return await removeEntityById('Artist', id, this.favorites.artists);
  }
}
