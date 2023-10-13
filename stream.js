// instead of async function in the dserver.js we are copy pasting the large data by using the "Stream".

const fs = require('fs')
const path = require('path')

// stream means seprate the larage data into smaller 
const rs = fs.createReadStream(path.join(__dirname, 'files', 'bigfile.txt'),{encoding: 'utf8'})
const ws = fs.createWriteStream(path.join(__dirname, 'files', 'new_bigfile.txt'))
/*  rs.on('data', (dataChunk) => {   // dataChunk means separating the large file data into smaller data 
    ws.write(dataChunk)
    }) 
*/

    // instead of dataChunk Procress we can use pipe()
    rs.pipe(ws);