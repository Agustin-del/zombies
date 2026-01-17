const path = require('node:path')
const { getImportsFromFile} = require ('./getImportsFromFile')

function getUnusedFiles(rootFiles, files, usedFiles = new Set()) {
    if(rootFiles.size === 0) return [...files]
    
    for(rootFile of rootFiles) {
        usedFiles.add(rootFile)

        const imports = getImportsFromFile(rootFile)

        getUnusedFiles(imports, files, usedFiles)
    }

    for(usedFile of usedFiles) {
        files.delete(usedFile)
    }

    return [...files]
}

 
module.exports = getUnusedFiles
