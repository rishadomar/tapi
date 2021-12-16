const fileSystem = require('fs');
const { exit } = require('process');
const { readFileStructure } = require('./readFolder');

const ExtractedCodeInFile = 'public/all-apis.json';

const writeFileContents = (content) => {
    const fd = fileSystem.openSync(ExtractedCodeInFile, 'w');
    fileSystem.writeSync(fd, JSON.stringify(content, null, 4));
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
if (!process.argv[2]) {
    console.error("Please specify path to your data folder.");
    exit(-1);
}
let content = {name: '', type: 'Folder', counter: 0, entries: []};
readFileStructure(process.argv[2], content);
writeFileContents(content);
copyFile(process.argv[2], 'public', 'settings.json');
