import {getUnusedFiles} from '../src/utils/getUnusedFiles'
import {getFilesByDirectory} from '../src/utils/getFilesByDirectory'
import {getImportsFromFile, getImportsFromJSFile, getImportsFromSvelteFile} from '../src/utils/getImportsFromFile'
import {findRootFiles} from '../src/utils/getRootFiles'
import {getUnusedFilesInDirectory} from '../src/main'
import path from 'node:path';

const directory = path.join('./tests/test-components')

test('getFilesByDirectory should return files in a directory recursively in an object with the paths as the keys', () => {
    const files =  getFilesByDirectory(directory)
    
    expect(files).toEqual(new Set([path.resolve(directory, 'hola.js'), path.resolve(directory, 'hola.svelte'), path.resolve(directory, './inside/hola.css'), path.resolve(directory, './inside/noused.svelte')]))
})

test('getRootFiles should return a set of the js files in the given directory', () => {
    const rootFiles = findRootFiles(directory)

    expect(rootFiles).toEqual(new Set([path.resolve(directory, 'hola.js')]))
})

test('getImportsFromFile should return a set of import paths', () => {
    
    const filePath = path.resolve(directory, 'hola.js')
    const imports = getImportsFromFile(filePath)
    
    expect(imports).toEqual(new Set([path.resolve(directory, 'hola.svelte')]))
})

test('getImportsFromJSfile should return an array of imports paths', () => {
    const filePath = path.resolve(directory, 'hola.js')
    const imports = getImportsFromJSFile(filePath)
    
    expect(imports).toEqual(new Set([path.resolve(directory, 'hola.svelte')]))
})

test('getImportsFromSvelteFile should return a set of import paths', () => {
    const filePath = path.resolve(directory, 'hola.svelte')
    const imports = getImportsFromSvelteFile(filePath)
    expect(imports).toEqual(new Set([path.resolve(directory, './inside/hola.css')]))
})


test("getUnusedFiles should return an array of the files that aren't being imported", () => {
    const rootFiles = [path.resolve(directory, 'hola.js')]
    const files = new Set([path.resolve(directory, './inside/hola.css'), path.resolve(directory, 'hola.js'), path.resolve(directory, 'hola.svelte'), path.resolve(directory, './inside/noused.svelte')])

    const unusedFiles = getUnusedFiles(rootFiles, files) 
    expect(unusedFiles).toEqual([path.resolve(directory, './inside/noused.svelte')])
})



// test('findUnusedFilesInDirectory should return unused files in a given directory', () => {
//     const files = findUnusedFilesInDirectory(directory)
//     expect(files).toEqual([path.resolve(directory, './inside/noused.svelte')])
// })
// test('findUnusedFilesInDirectory should be able to manage directories in different formats', () => {

// })

