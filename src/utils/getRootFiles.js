const fs = require('node:fs')
const path = require('node:path')

function findRootFiles(directory) {
    return new Set(fs.readdirSync(directory).filter(file => path.extname(file) === '.js').map(file => path.resolve(directory, file)) || [])
}

module.exports = findRootFiles