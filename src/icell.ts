/**
 * Interfaccia della cella, ogni cella ha uno status ed evolve. :D
 */
export interface ICell<T> {
    status: T;
    evolve(neighbours: ICell<T>[]): T;
}