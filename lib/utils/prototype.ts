import { IFunction } from '../interfaces/index';

declare global {
    interface Element{
        setAttributes: IFunction
        removeAttributes: IFunction
        matchesSelector: any
        mozMatchesSelector: any
        msMatchesSelector: any
    }
}


function prototype() {
    if (!Element.prototype.setAttributes) {
        Element.prototype.setAttributes = function(attr) {
            var node = this;
            for (let key in attr) {
                if (key !== '') {
                    node.setAttribute(key, attr[key]);
                }
            }
            return node
        };
    }

    if (!Element.prototype.removeAttributes) {
        Element.prototype.removeAttributes = function(...agrs) {
            var node = this;
            for (let key in agrs) {
                if (agrs[key] !== '') {
                    node.removeAttribute(agrs[key]);
                }
            }
            return node
        };
    }

    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(css: string) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }
}

export default prototype