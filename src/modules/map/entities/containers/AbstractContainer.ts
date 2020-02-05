export interface ContainerEntitiesHashMap<T> {
  [key: string]: T
}

export abstract class AbstractContainer<T> {
  name: string = '';
  entities: Map<string, T> = new Map();

  set (name: string, entity: T): this {
    this.entities.set(name, entity);

    return this;
  };

  get (name: string): T | undefined {
    return this.entities.get(name);
  };

  getAll (): ContainerEntitiesHashMap<T> {
    const entitiesHashMap: ContainerEntitiesHashMap<T> = {};

    this.entities.forEach((entity: T, key: string) => {
      entitiesHashMap[key] = entity;
    });

    return entitiesHashMap;
  };
}
