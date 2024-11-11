import { NotFoundException } from '@nestjs/common';

export const removeEntityById = async <EntityType extends { id: string }>(
  entityName: string,
  entityId: string,
  entities: EntityType[],
): Promise<string> => {
  const entityIndex = entities.findIndex((user) => user.id === entityId);

  if (entityIndex === -1) {
    throw new NotFoundException(`${entityName} with ID: ${entityId} not found`);
  }

  entities.splice(entityIndex, 1);

  return `${entityName} has been deleted`;
};
