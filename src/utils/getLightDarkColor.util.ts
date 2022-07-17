// const rgbToHex = (r: any, g: any, b: any) =>
//     '#' +
//     [r, g, b]
//         .map((x) => {
//             const hex = x.toString(16);
//             return hex.length === 1 ? '0' + hex : hex;
//         })
//         .join('');

const hexToRgb = (hex: any) =>
    'rgb(' +
    hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m: any, r: any, g: any, b: any) => '#' + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)
        .map((x: any) => parseInt(x, 16)) +
    ')';

export const getLightDarkColor = (p: any, c0: any, o?: any) => {
    if (c0.charAt(0) === '#') {
        c0 = hexToRgb(c0);
    }

    var i = parseInt,
        r = Math.round,
        [a, b, c, d] = c0.split(','),
        n = p < 0,
        t = n ? 0 : 255 * p,
        P = n ? 1 + p : 1 - p;

    o && (d = o);

    return (
        'rgb' +
        (d ? 'a(' : '(') +
        r(i(a[3] === 'a' ? a.slice(5) : a.slice(4)) * P + t) +
        ',' +
        r(i(b) * P + t) +
        ',' +
        r(i(c) * P + t) +
        (d ? ',' + d : ')')
    );
};
