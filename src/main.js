const getFilesByDirectory = require('./utils/getFilesByDirectory')
const getRootFiles = require('./utils/getRootFiles')
const getUnusedFiles = require('./utils/getUnusedFiles')

// manejar como llega el directorio.

function getUnusedFilesInDirectory(directory) {
    const files = getFilesByDirectory(directory)
    const rootFiles = getRootFiles(directory)
    return getUnusedFiles(rootFiles, files)    
}

module.exports = getUnusedFilesInDirectory

 
