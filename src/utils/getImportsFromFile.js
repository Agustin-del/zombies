import fs from 'node:fs'
import path from 'node:path'
import esprima from 'esprima';


export function getImportsFromFile (filePath) {
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

export function getImportsFromJSFile(filePath) {
    let imports = esprima.parseModule((fs.readFileSync(filePath,'utf-8'))).body
                    .filter(node => node.type === 'ImportDeclaration')
                    .map(node => path.resolve(path.dirname(filePath), node.source.value))
    
    if(imports) {
        return new Set(imports)
    }
    return new Set()
}

export function getImportsFromSvelteFile(filePath) {
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
