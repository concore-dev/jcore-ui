import { IObject } from './../interfaces/index';


export type TEventEmitterListener = (...args: any) => void

export type TEventEmitter = EventEmitter;


class EventEmitter {
    events: IObject

    constructor() {
        this.events = {};
    }

    /**
     * Добавляет событие
     */
    on(event: string, listener: TEventEmitterListener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.removeListener(event, listener);
    }

    /**
     * Удаляет событие
     */
    removeListener(event: string, listener: TEventEmitterListener) {
        if (typeof this.events[event] === 'object') {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    /**
     * Вызывает событие
     */
    emit(event: string, ...args: any) {
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach((listener: TEventEmitterListener) => listener.apply(this, args));
        }
    }

    once(event: string, listener: TEventEmitterListener) {
        const remove = this.on(event, (...args) => {
            remove();
            listener.apply(this, args);
        });
    }
};


export default EventEmitter