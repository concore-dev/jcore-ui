import { IObject } from '../interfaces/index';

interface IDomProps extends IObject {}

export type TDom = Dom;

declare global {
    interface Window {
        $: any
    }

    var $:any;
    var j:any;
}

class Dom {
    selector: any;

    constructor(selector: string) {
        this.selector = typeof selector === 'string' ? document.querySelectorAll(selector) : [...selector];
    }

    init() {
        return this.selector;
    }

    q(selector: string): NodeListOf<HTMLElement> {
        if (typeof selector !== 'string') {
            return selector
        }

        const $selectors = document.querySelectorAll<HTMLElement>(selector)

        return $selectors;
    }

    addClass(...classes: Array<string>) {
        // const classNames = arrayFlat(classes.map((c) => c.split(' ')));

        // this.$elements.forEach(el => {
        //     el.classList.add(classes.join(' '))
        // })

        return this;
    }
}

if (typeof window.$ === 'undefined') {
    window.$ = function(selector: any) {
        return new Dom(selector).init()
    };
} else if (typeof window.j === 'undefined') {
    // window.j = function() {
    //     return new Dom(selector).init()
    // };
}

// export default Dom