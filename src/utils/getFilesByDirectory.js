const fs = require('node:fs')
const path = require('node:path')

//probar usar un set

function getFilesByDirectory(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes:true })

    let files = new Set()

    for (entry of entries) {
        const fullPath = path.resolve(directory, entry.name)
        if(entry.isDirectory()) {
            files = new Set([...files, ...getFilesByDirectory(fullPath)])
        } else {
            files.add(fullPath)
        }
    }
    

    return files
    // let files = {}
    // for (entry of entries) {
    //     const fullPath = path.resolve(directory, entry.name)
    //     if (entry.isDirectory()) {
    //         files = Object.assign(files, getFilesByDirectory(fullPath))
    //     } else {
    //         files[fullPath] = fullPath
    //     }
    // }
    return files
    
}

module.exports = getFilesByDirectory
