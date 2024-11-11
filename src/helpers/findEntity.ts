import { NotFoundException } from '@nestjs/common';

export const findEntityById = async <EntityType extends { id: string }>(
  id: string,
  entities: EntityType[],
): Promise<EntityType> => {
  const foundedEntity = entities.find((entity) => entity.id === id);

  if (!foundedEntity) {
    throw new NotFoundException(`Entity with ID: ${id} not found`);
  }

  return foundedEntity as EntityType;
};
