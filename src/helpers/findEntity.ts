import { NotFoundException } from '@nestjs/common';

export const findEntityById = async <EntityType extends { id: string }>(
  entityName: string,
  id: string,
  entities: EntityType[],
): Promise<EntityType> => {
  const foundedEntity = entities.find((entity) => entity.id === id);

  if (!foundedEntity) {
    throw new NotFoundException(`${entityName} with ID: ${id} not found`);
  }

  return foundedEntity as EntityType;
};
