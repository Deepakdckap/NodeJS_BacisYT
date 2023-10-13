console.log("Hellols");
// console.log(global);

// core modules 
const os = require('os');
const path = require('path');
/*
console.log(os.type());
console.log(os.version());
console.log(os.homedir());


console.log(__dirname);
console.log(__filename);

console.log(path.parse(__filename));
*/
// // import other file in this file 
const math = require('./math')

console.log(math.add(3,3));

const {add, sub, mul, div} = require('./math')
console.log (add (3, 3))
console.log(sub (3, 3))
console.log (mul (3, 3))
console.log (div(3,3))
