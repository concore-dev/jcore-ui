declare global {
    interface Window {
    }
}
export declare type JDomCreate = (element: string | HTMLElement | NodeList) => JDom;
export declare function $(element: string | HTMLElement | NodeList): JDom;
export declare class JDom {
    element: Array<HTMLElement>;
    constructor(element: any);
    get(index?: number): HTMLElement;
    find(element: string): JDom;
    addClass(...classes: string[]): this;
}
//# sourceMappingURL=JDom.d.ts.map