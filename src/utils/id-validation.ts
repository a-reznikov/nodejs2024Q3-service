import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export const isValidId = (id: string) => validate(id);

export const validateId = (id: string) => {
  if (!isValidId(id)) {
    throw new BadRequestException('The ID must be in UUID format');
  }
};
