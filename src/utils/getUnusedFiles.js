import path from 'node:path'
import {getImportsFromFile} from './getImportsFromFile.js'

export function getUnusedFiles(rootFiles, files, usedFiles = new Set()) {
    if(rootFiles.size === 0) return [...files]
    
    for(const rootFile of rootFiles) {
        usedFiles.add(rootFile)

        const imports = getImportsFromFile(rootFile)

        getUnusedFiles(imports, files, usedFiles)
    }

    for(const usedFile of usedFiles) {
        files.delete(usedFile)
    }

    return [...files]
}
