const { format } = require('date-fns'); 

console.log(format(new Date(), 'dd/MM/yyyy\tHH:mm:ss'));

// we can use any name 
const {v4: uuid} = require('uuid')

console.log(uuid());