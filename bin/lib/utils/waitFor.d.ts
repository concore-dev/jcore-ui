import { TFunction } from './../interfaces/index';
export interface IWaitFor {
    count?: number;
    time?: number;
}
export default function waitFor(source: TFunction, callback: TFunction, opt?: IWaitFor): void;
//# sourceMappingURL=waitFor.d.ts.map