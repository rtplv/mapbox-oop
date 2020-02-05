export abstract class AbstractStore {
  abstract get state (): any;

  abstract commit(action: string, payload: any): any;
  abstract commitAsync(action: string, payload: any): any;
}
