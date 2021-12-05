const fileSystem = require('fs');
const path = require('path');

/**
 * Convert name
 */
const convertFilenameToPosix = (filename) => {
    return filename.split(path.sep).join(path.posix.sep);
};

/**
 * Add entry
 */
const addFile = (counter, name) => {
    const posixFile = convertFilenameToPosix(name);
    const values = posixFile.split(path.posix.sep);
    let newEntry = JSON.parse(fileSystem.readFileSync(posixFile));
    newEntry.category = values[values.length - 2];
    newEntry.filename = posixFile;
    newEntry.name = values[values.length - 1].replace('.json', '');
    newEntry.id = counter;
    return newEntry;
};

/**
 * Extract code from files in the folder
 *
 * @param {*} folder
 */
const readFileStructure = (response, folder) => {
    const dirEntries = fileSystem.readdirSync(folder, { withFileTypes: true });
    for (let i = 0; i < dirEntries.length; i++) {
        const dirEntry = dirEntries[i];
        if (dirEntry.isDirectory()) {
            readFileStructure(response, path.join(folder, dirEntry.name));
        } else if (dirEntry.name !== 'settings.json' && dirEntry.name.match(/.json/)) {
            response.jsonFileEntries.push(addFile(++response.counter, path.join(folder, dirEntry.name)));
        }
    }
};

exports.readFileStructure = readFileStructure;
