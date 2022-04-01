var crypto = require('crypto');

const URL = 'https://link.layers.education/w?cc?9x?';
const SHA256 = '76949a35477f8b8f5e35c50d3006c01dbc4515bb744d88f0b636bc5f2fc20756';

const ALPHABET = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const COMBINATIONS = 238328;

let getChars = (iteration) => {
    let currentIteration = 0;
    let alphaLength = ALPHABET.length;

    for (let i1 = 0; i1 < alphaLength; i1++) {
        for (let i2 = 0; i2 < alphaLength; i2++) {
            for (let i3 = 0; i3 < alphaLength; i3++) {
                currentIteration++;
                if (currentIteration == iteration) {
                    return ALPHABET[i1] + ALPHABET[i2] + ALPHABET[i3];
                }
            }
        }
    }
}

String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

for (let c = 1; c < COMBINATIONS; c++) {
    let chars = getChars(c);
    let newUrl = URL;
    newUrl = newUrl.replaceAt(31, chars[0]);
    newUrl = newUrl.replaceAt(34, chars[1]);
    newUrl = newUrl.replaceAt(37, chars[2]);

    var calculatedSHA = crypto.createHash('sha256').update(newUrl).digest('hex');
    console.log(calculatedSHA);
    if (calculatedSHA == SHA256) {
        console.log(' ***** FOUND after ' + c + ': ' + newUrl);
        break;
    }
}