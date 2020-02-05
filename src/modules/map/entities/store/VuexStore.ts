import { Store } from 'vuex';
import { AbstractStore } from '~src/modules/map/entities/store/AbstractStore';

export interface AbstractModules {
  [key: string]: any
}

export type StateWithModules<T> = T & AbstractModules;

export class VuexStore<T> extends AbstractStore {
  constructor (
    private store: Store<StateWithModules<T>>,
    private modulePath?: string[],
  ) {
    super();
  }

  get state (): T | StateWithModules<T> {
    if (!this.modulePath) {
      return this.store.state;
    }

    let lastEl = this.store.state;

    this.modulePath.forEach((node) => {
      if (node in lastEl) {
        lastEl = lastEl[node];
      }
    });

    return lastEl;
  }

  commit (action: string, payload: any): this {
    this.store.commit(this.getActionWithNamespace(action), payload);

    return this;
  }

  commitAsync (action: string, payload: any): Promise<any> {
    return this.store.dispatch(this.getActionWithNamespace(action), payload);
  }

  private getActionWithNamespace (action: string): string {
    if (!this.modulePath) {
      return action;
    }

    const modulePathStr = this.modulePath.join('/');

    return `${modulePathStr}/${action}`;
  }
}
