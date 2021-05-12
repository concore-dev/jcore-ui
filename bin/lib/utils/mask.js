"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mask = {
    string(element) {
        function mask(element) {
            element.value = element.value.replace(/[^a-zA-ZА-Яа-яЁё]/gi, '').replace(/\s+/gi, '').trim();
        }
        element.addEventListener('input', function () {
            mask(element);
        });
        element.addEventListener('keydown', function () {
            mask(element);
        });
        mask(element);
        return element;
    },
    number(element) {
        function mask(element) {
            element.value = element.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '').trim();
        }
        element.addEventListener('input', function () {
            mask(element);
        });
        element.addEventListener('keydown', function () {
            mask(element);
        });
        mask(element);
        return element;
    },
    float(element) {
        function mask(element) {
            element.value = element.value.replace(/[^\d+.\d+]/g, '').trim();
        }
        element.addEventListener('input', function () {
            mask(element);
        });
        element.addEventListener('keydown', function () {
            mask(element);
        });
        mask(element);
        return element;
    },
    phone(element) {
        let keyCode;
        const mask = (event) => {
            event.keyCode && (keyCode = event.keyCode);
            const position = element.selectionStart;
            if (position < 3 && event.keyCode != 35 && event.keyCode != 39) {
                event.preventDefault();
                element.selectionStart = element.value.length;
            }
            element.value = checkMask(event, element.value);
            if (element.value[1] == '9') {
                let valueArr = element.value.split('');
                valueArr.splice(1, 0, '7');
                let strValue = valueArr.join('');
                strValue = strValue.replace(/[^+\d]/g, '');
                element.value = checkMask(event, strValue);
            }
            else {
                element.value = element.value.replace(element.value[1], '7');
            }
        };
        const checkMask = (event, value) => {
            const matrix = "+7 (___) ___-____";
            let i = 0;
            const defaulthMask = matrix.replace(/\D/g, "");
            const elementValue = value.replace(/\D/g, "");
            let newElementValue = matrix.replace(/[_\d]/g, (a) => {
                return i < elementValue.length ? elementValue.charAt(i++) || defaulthMask.charAt(i) : a;
            });
            i = newElementValue.indexOf("_");
            if (i != -1) {
                newElementValue = newElementValue.slice(0, i);
            }
            let reg = matrix.substr(0, value.length).replace(/_+/g, (a) => {
                return "\\d{1," + a.length + "}";
            })
                .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(value) || value.length < 5 || keyCode > 47 && keyCode < 58) {
                value = newElementValue;
            }
            if (event.type == "blur" && value.length < 5) {
                value = "";
            }
            if (event.type == "input" && value.length < 5 && keyCode > 36 && keyCode < 41) {
                event.preventDefault();
            }
            return value;
        };
        element.addEventListener("input", mask, false);
        element.addEventListener("focus", mask, false);
        element.addEventListener("blur", mask, false);
        element.addEventListener("keydown", mask, false);
        return element;
    }
};
exports.default = mask;
//# sourceMappingURL=mask.js.map