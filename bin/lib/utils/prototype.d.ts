import { IFunction } from '../interfaces/index';
declare global {
    interface Element {
        setAttributes: IFunction;
        removeAttributes: IFunction;
        matchesSelector: any;
        mozMatchesSelector: any;
        msMatchesSelector: any;
    }
}
declare function prototype(): void;
export default prototype;
//# sourceMappingURL=prototype.d.ts.map