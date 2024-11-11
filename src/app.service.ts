import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Home Library Service: You can find documentation at the: http://localhost:${
      process.env.PORT ?? 4000
    }/doc/`;
  }
}
