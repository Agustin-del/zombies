import fs from 'node:fs'
import path from 'node:path'

//probar usar un set

export function getFilesByDirectory(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes:true })

    let files = new Set()

    for (const entry of entries) {
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
