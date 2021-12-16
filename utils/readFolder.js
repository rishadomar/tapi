const fileSystem = require('fs');
const path = require('path');

/**
 * Convert name
 */
const convertFilenameToPosix = (filename) => {
    return filename.split(path.sep).join(path.posix.sep);
};

const createFolder = (counter, folderName) => {
    let newEntry = {
        name: convertFilenameToPosix(folderName),
        entries: [],
        type: 'Folder',
        counter
    };
    return newEntry;
};

/**
 * Add entry
 */
const createFile = (counter, name) => {
    const posixFile = convertFilenameToPosix(name);
    const values = posixFile.split(path.posix.sep);
    let newEntry = {
        ...JSON.parse(fileSystem.readFileSync(posixFile)),
        type: 'File',
        category: values[values.length - 2],
        filename: posixFile,
        name: values[values.length - 1].replace('.json', ''),
        id: counter
    };
    return newEntry;
};

/**
 * Extract code from files in the folder
 *
 * @param {*} content
 */
const readFileStructure = (dir, content) => {
    const dirEntries = fileSystem.readdirSync(dir, { withFileTypes: true });
    for (let i = 0; i < dirEntries.length; i++) {
        const dirEntry = dirEntries[i];
        if (dirEntry.isDirectory()) {
            if (!dirEntry.name.startsWith('.')) {
                const newDir = path.join(dir, dirEntry.name);
                const newFolder = createFolder(++content.counter, dirEntry.name);
                content.entries.push(newFolder);
                readFileStructure(newDir, newFolder);
            }
        } else if (dirEntry.name !== 'settings.json' && dirEntry.name.match(/.json/)) {
            content.entries.push(createFile(++content.counter, path.join(dir, dirEntry.name)));
        }
    }
};

exports.readFileStructure = readFileStructure;
