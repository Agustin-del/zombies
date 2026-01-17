const fs = require('node:fs')
const path = require('node:path')
const esprima = require('esprima');


function getImportsFromFile (filePath) {
    let imports = new Set()
    switch(path.extname(filePath)) {
        case '.js':
            imports = getImportsFromJSFile(filePath)
            break
        case '.svelte':
            imports = getImportsFromSvelteFile(filePath)
            break
        default:
            return new Set()
    }

    return imports
}

function getImportsFromJSFile(filePath) {
    let imports = esprima.parseModule((fs.readFileSync(filePath,'utf-8'))).body
                    .filter(node => node.type === 'ImportDeclaration')
                    .map(node => path.resolve(path.dirname(filePath), node.source.value))
    
    if(imports) {
        return new Set(imports)
    }
    return new Set()
}

function getImportsFromSvelteFile(filePath) {
    const regex = /<script[\s\S]*?>([\s\S]*?)<\/script>/g;
    const importRegex = /import\s+(?:.*?\s+from\s+)?['"](.*?)['"];?/gm;
    const svelteSrc = fs.readFileSync(filePath, 'utf-8')

    const match = regex.exec(svelteSrc)
    if(match && match[1]) {
        const script = match[1]
        const imports = []
        let importMatch
        while((importMatch = importRegex.exec(script)) !== null) {
            imports.push(path.resolve(path.dirname(filePath), importMatch[1]))
        }
        
        return new Set(imports)
    }
    return new Set()
    
}

module.exports = { getImportsFromFile, getImportsFromJSFile, getImportsFromSvelteFile }

 