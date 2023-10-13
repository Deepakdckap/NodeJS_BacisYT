/*
import { readFile } from 'node:fs';  // should to give space after the colan: 
readFile('./files/start.txt', 'utf8', (err, data) => {  // we can use 'utf8' or either we can use .toString() in the console.log(data)
if (err) throw err;
console.log(data);
});

//exit on uncaught errors
process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1)
})
*/

// in the .mjs file we cannot use require() 
// so we are changing the file name an .js instead of .mjs
    /* const fs = require('fs')
    const path = require('path')
    fs. readFile(path.join(__dirname, 'files', 'start.txt'), 'utf8', (err, data) =>{
        if (err) throw err;
        console.log(data);
    }); */

// node can be works in the asyncrones eg: console.log("hiii") ->  this will run first because it will no wait for anything. 
 
// to create an read in the new file in the files dir
// we can create files with both writeFile() or appendFile()
// in another word they will call it as "Callback hell"
/*
    fs.writeFile(path.join(__dirname, 'files', 'new.txt'), 'Hello friends', (err => {
    if (err) throw err;
    console.log('The file has been created');

// to update any text in the same targeted file we need to use appendFile()
    fs.appendFile(path.join(__dirname, 'files', 'new.txt'), '\n\n Thank you friends', (err) => {
        if (err) throw err;
        console.log('The file has been updated');

// to rename the file name into any name
// first we need to put the old file name and then new file name as a second parameter
    fs.rename(path.join(__dirname,'files','new.txt'),(path.join(__dirname,"files","thanks.txt")), function (err){
        if(!err)
        {
            console.log("the file is renamed");
        }else
        {
            throw Error ("Error renaming the file")
        }
        });          
    })
}));

process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1)
})
*/
// --------------------------

// instead of above function call back we can use the below async function
// the async await is the trending one  
const path = require('path')
const fsPromises = require('fs').promises
// async function main(){
    const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname,'files','start.txt'),'utf8');
        console.log(data);

        // write in the file or create
        await fsPromises.writeFile(path.join(__dirname, 'files', 'new.txt'), 'Hello friends')
        console.log("Wite completed");

        // append in the file
      await fsPromises.appendFile(path.join(__dirname, 'files', 'new.txt'), '\n\n Thank you friends')   
        console.log("Update completed");

        // rename the file 
        await fsPromises.rename(path.join(__dirname,'files','new.txt'),(path.join(__dirname,"files","thanks.txt")))
        console.log("Rename completed");

        // delete an particular file
        await fsPromises.unlink(path.join(__dirname, 'files', 'start.txt'))
        console.log("Deleted succesfully");
        }catch(e){
            console.log(`${e}`);
        }
            // try{
            //     let stringToAppend = `\n\n Thanks for watching`;
            //     await fsPromises.appendFile(path.join(__dirname, 'files', 'start.txt') ,stringToAppend,'utf8' );
            //     } catch(e){console.log (`${e}`)}
            //     }
                // main();
        }
fileOps();