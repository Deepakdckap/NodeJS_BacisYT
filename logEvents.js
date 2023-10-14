const { format } = require('date-fns'); 

console.log(format(new Date(), 'dd/MM/yyyy\tHH:mm:ss'));

// we can use any name 
const {v4: uuid} = require('uuid')

console.log(uuid());

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')}`
    const logItems = `${dateTime}\t${uuid()}\t${message}\n`

    console.log(logItems);
    try {
        // if condition to chech the the folder is already exists
        // if(!await fsexistsSync(path.join(__dirname, '..', '/logs'))) await mkdirsPromise(path.join(__dirname,))  => auto completed code
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }

        // we are createing the folder and file with the dateTime message
        await fsPromises.appendFile(path.join(__dirname, 'logs','eventFile.txt'),logItems) // it is not a concadination
    } catch (error) {
        console.error(
            `Failed to write event to the file due error: ${error.message}`
        );
    }
}   

module.exports = logEvents