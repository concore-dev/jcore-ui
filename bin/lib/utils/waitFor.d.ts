import { IFunction } from './../interfaces/index';
export interface IWaitFor {
    count?: number;
    time?: number;
}
export default function waitFor(source: IFunction, callback: IFunction, opt?: IWaitFor): void;
//# sourceMappingURL=waitFor.d.ts.map