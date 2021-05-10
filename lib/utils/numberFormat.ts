function numberFormat(number: any, decimals: any, dec_point: any, separator: any) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n: any = !isFinite(+number) ? 0 : +number,
      prec: any = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep: any = (typeof separator === 'undefined') ? ',' : separator ,
      dec: any = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s: any = '',
      toFixedFix = function(n: any, prec: any) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k)
          .toFixed(prec);
      };
    // Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
      .split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
      .length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1)
        .join('0');
    }
    return s.join(dec);
}

export default numberFormat