// in this file we are going to create an directory by using the this js
const fs = require('fs') 

// this mkdir will create an new folder, above to the dir.js

// to check the folder weather it is already exists
// we can use existsSync in the fileSystem. 
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err
        console.log('Directory created')
    })      
}
// -------------\
// to remove the existing folder we can use rmdir
if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err
        console.log('Folder Deleted')
    })      
}


process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1)
})