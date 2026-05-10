import fs from 'node:fs'
import path from 'node:path'

export function findRootFiles(directory) {
    return new Set(fs.readdirSync(directory).filter(file => path.extname(file) === '.js').map(file => path.resolve(directory, file)) || [])
}
