export default function declension(count, f1, f24, f50) {
    if (count % 100 < 10 || count % 100 > 20) {
        if (1 == count % 10) {
            return f1.replace('%d', count);
        } else if ([2, 3, 4].indexOf(count % 10) > -1) {
            return f24.replace('%d', count);
        }
    }
    return f50.replace('%d', count);
}