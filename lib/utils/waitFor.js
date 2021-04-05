export default function waitFor (source, callback, options = {count: 10, time: 1000}) {
    var counter = options.count;
    var time = options.time;

    (function check() {
      var result = source();

      if (result) {
        callback(result);
        return;
      }

      if (counter == 0) {
        return;
      }

      counter -= 1;
      setTimeout(check, time);
    }());
};