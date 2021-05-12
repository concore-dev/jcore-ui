import { IFunction } from './../interfaces/index';

export interface IWaitFor {
    count?: number, time?: number
}

export default function waitFor (source: IFunction, callback: IFunction, opt?: IWaitFor) {
    const options: IWaitFor = Object.assign({count: 10, time:  1000}, opt);

    (function check() {
      var result = source();

      if (result) {
        callback(result);
        return;
      }

      if (options.count === 0) {
        return;
      }

      options.count -= 1;
      setTimeout(check, options.time);
    }());
};