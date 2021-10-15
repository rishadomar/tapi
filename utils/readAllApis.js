const fileSystem = require('fs');
const path = require('path');

const ExtractedCodeInFile = 'public/all-apis.json';

let jsonFileEntries = [];
let totalAddedValues = 0;

const convertFilenameToPosix = (filename) => {
    return filename.split(path.sep).join(path.posix.sep);
};

const addFile = (name) => {
    const posixFile = convertFilenameToPosix(name);
    const values = posixFile.split(path.posix.sep);
    let newEntry = JSON.parse(fileSystem.readFileSync(posixFile));
    newEntry.category = values[2];
    newEntry.filename = posixFile;
    newEntry.name = values[3];
    newEntry.id = ++totalAddedValues;
    jsonFileEntries.push(newEntry);
};

/**
 * Extract code from files in the folder
 *
 * @param {*} folder
 */
const readFileStructure = (folder) => {
    fileSystem
        .readdirSync(folder, { withFileTypes: true })
        .forEach((dirEntry) => {
            if (dirEntry.isDirectory()) {
                readFileStructure(path.join(folder, dirEntry.name));
            } else if (dirEntry.name.match(/.json/)) {
                addFile(path.join(folder, dirEntry.name));
            }
        });
};

const readFileContents = () => {
    jsonFileEntries.forEach((fileEntry) => {
        console.log('Category: ' + fileEntry.category);
        fileEntry.apis.forEach((f) => {
            console.log(`\t ${f.name} (${f.filename})`);
        });
    });
};

const writeFileContents = () => {
    const fd = fileSystem.openSync(ExtractedCodeInFile, 'w');
    fileSystem.writeSync(fd, JSON.stringify(jsonFileEntries, null, 4));
    fileSystem.closeSync(fd);
};

/**
 * Main
 */
for (let i = 2; i < process.argv.length; i++) {
    readFileStructure(process.argv[i]);
}
//console.log("File entries:", jsonFileEntries);

//readFileContents();
writeFileContents();
