import {getFilesByDirectory} from "./utils/getFilesByDirectory.js"
import {findRootFiles} from './utils/getRootFiles.js'
import {getUnusedFiles} from './utils/getUnusedFiles.js'

// manejar como llega el directorio.

export function getUnusedFilesInDirectory(directory) {
    const files = getFilesByDirectory(directory)
    const rootFiles = findRootFiles(directory)
    return getUnusedFiles(rootFiles, files)    
}

console.log(getUnusedFilesInDirectory("."))
