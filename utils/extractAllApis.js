const fileSystem = require('fs');
const { readFileStructure } = require('./readFolder');

const ExtractedCodeInFile = 'public/all-apis.json';

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
};

/**
 * Main
 */
let jsonFileEntries = [];
let counter = 0;
readFileStructure({ jsonFileEntries, counter }, process.argv[2]);
writeFileContents(jsonFileEntries);
copyFile(process.argv[2], 'public', 'settings.json');
