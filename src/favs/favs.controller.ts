import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { validateId } from 'src/utils/id-validation';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string) {
    validateId(id);

    try {
      const foundedTrack = await this.trackService.findOne(id);

      return await this.favsService.addTrack(foundedTrack);
    } catch (error) {
      throw new UnprocessableEntityException(
        `Track with ID: ${id} doesn't exist`,
      );
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') id: string) {
    validateId(id);

    try {
      const foundedAlbum = await this.albumService.findOne(id);

      return await this.favsService.addAlbum(foundedAlbum);
    } catch (error) {
      throw new UnprocessableEntityException(
        `Album with ID: ${id} doesn't exist`,
      );
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') id: string) {
    validateId(id);

    try {
      const foundedArtist = await this.artistService.findOne(id);

      return await this.favsService.addArtist(foundedArtist);
    } catch (error) {
      throw new UnprocessableEntityException(
        `Artist with ID: ${id} doesn't exist`,
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: string) {
    validateId(id);

    return await this.favsService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: string) {
    validateId(id);

    return await this.favsService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: string) {
    validateId(id);

    return await this.favsService.removeArtist(id);
  }
}
