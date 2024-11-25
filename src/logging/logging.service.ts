import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  logError(message: string) {
    this.logger.error(message);
  }

  logWarning(message: string) {
    this.logger.warn(message);
  }

  logInfo(message: string) {
    this.logger.log(message);
  }
}
