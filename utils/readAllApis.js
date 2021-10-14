const fileSystem = require('fs');
const path = require('path');

const ExtractedCodeInFile = "public/all-apis.json";

let jsonFileEntries = [];

const convertFilenameToPosix = filename => {
    //const removedSrc = filename.replace('src' + path.sep + 'data' + path.sep, '')
    //return removedSrc.split(path.sep).join(path.posix.sep)
    return filename.split(path.sep).join(path.posix.sep);
}

const addFile = name => {
    const posixFile = convertFilenameToPosix(name);
    const values = posixFile.split(path.posix.sep)
    const i = jsonFileEntries.findIndex(entry => entry.category === values[2])
    let newEntry = JSON.parse(fileSystem.readFileSync(posixFile));
    newEntry.filename = posixFile;
    newEntry.name = values[3];
    if (i < 0) {
        jsonFileEntries.push({ category: values[2], apis: [newEntry] })
    } else {
        const fileEntry = jsonFileEntries[i];
        fileEntry.apis.push(newEntry)
    }
}

/**
 * Extract code from files in the folder
 *
 * @param {*} folder
 */
const readFileStructure = folder => {
    fileSystem.readdirSync(folder, { withFileTypes: true }).forEach(dirEntry => {
        if (dirEntry.isDirectory()) {
            readFileStructure(path.join(folder, dirEntry.name))
        } else if (dirEntry.name.match(/.json/)) {
            addFile(path.join(folder, dirEntry.name))
        }
    });
}

const readFileContents = () => {
    jsonFileEntries.forEach(fileEntry => {
        console.log("Category: " + fileEntry.category);
        fileEntry.apis.forEach(f => {
            console.log(`\t ${f.name} (${f.filename})`);
        })
    })
}

const writeFileContents = () => {
    const fd = fileSystem.openSync(ExtractedCodeInFile, "w");
    fileSystem.writeSync(fd, JSON.stringify(jsonFileEntries, null, 4))
    fileSystem.closeSync(fd);
}

/**
 * Main
 */
for (let i = 2; i < process.argv.length; i++) {
    readFileStructure(process.argv[i]);
}
//console.log("File entries:", jsonFileEntries);

//readFileContents();
writeFileContents();
