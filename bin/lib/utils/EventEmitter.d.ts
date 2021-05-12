import { IObject, IFunction } from '../interfaces/index';
export declare type TEventEmitter = EventEmitter;
declare class EventEmitter {
    events: IObject;
    constructor();
    on(event: string, listener: IFunction): () => void;
    removeListener(event: string, listener: IFunction): void;
    emit(event: string, ...args: any): void;
    once(event: string, listener: IFunction): void;
}
export default EventEmitter;
//# sourceMappingURL=EventEmitter.d.ts.map