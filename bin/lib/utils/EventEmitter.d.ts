import { IObject } from './../interfaces/index';
import { TFunction } from '../interfaces/index';
export declare type TEventEmitter = EventEmitter;
declare class EventEmitter {
    events: IObject;
    constructor();
    on(event: string, listener: TFunction): () => void;
    removeListener(event: string, listener: TFunction): void;
    emit(event: string, ...args: any): void;
    once(event: string, listener: TFunction): void;
}
export default EventEmitter;
//# sourceMappingURL=EventEmitter.d.ts.map