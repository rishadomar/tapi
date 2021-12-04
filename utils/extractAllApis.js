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
    newEntry.category = values[values.length - 2];
    newEntry.filename = posixFile;
    newEntry.name = values[values.length - 1];
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
            } else if (
                dirEntry.name !== 'settings.json' &&
                dirEntry.name.match(/.json/)
            ) {
                addFile(path.join(folder, dirEntry.name));
            }
        });
};

const writeFileContents = () => {
    const fd = fileSystem.openSync(ExtractedCodeInFile, 'w');
    fileSystem.writeSync(fd, JSON.stringify(jsonFileEntries, null, 4));
    fileSystem.closeSync(fd);
};

const copyFile = (source, destination, filename) => {
    // File destination.txt will be created or overwritten by default.
    fileSystem.copyFile(source + '/' + filename, destination + '/' + filename, (err) => {
        if (err) {
            throw err;
        }
    });
}

/**
 * Main
 */
readFileStructure(process.argv[2]);
writeFileContents();
copyFile(process.argv[2], 'public', 'settings.json');