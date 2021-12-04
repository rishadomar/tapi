const fileSystem = require('fs');
const path = require('path');

const GeneratedTestInPath = 'cypress/integration/';

let jsonFileEntries = [];
let totalAddedValues = 0;

/**
 * Convert name
 */
const convertFilenameToPosix = (filename) => {
    return filename.split(path.sep).join(path.posix.sep);
};

/**
 * Add entry
 */
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

/**
 * Generate 
 */
const generateEntries = () => {
    let currentCategory;
    let fileEntries = [];
    jsonFileEntries.forEach((fileEntry) => {
        if (!currentCategory || fileEntry.category !== currentCategory) {
            if (currentCategory && fileEntries.length > 0) {
                writeEntries(currentCategory, fileEntries);
            }
            currentCategory = fileEntry.category;
            fileEntries = [];
        }
        fileEntries.push(fileEntry);
    });
    if (currentCategory && fileEntries.length > 0) {
        writeEntries(currentCategory, fileEntries);
    }
};

/**
 * Write entries for category
 * @param {*} category 
 * @param {*} fileEntries 
 */
const writeEntries = (category, fileEntries) => {
    const writeLine = (fd, tabs, line) => {
        let tabLine = '';
        for (let i = 0; i < tabs; i++) {
            tabLine += '\t';
        }
        fileSystem.writeSync(fd, tabLine + line + '\n');
    }

    const fd = fileSystem.openSync(`${GeneratedTestInPath}/${category}_spec.js`, 'w');
    
    writeLine(fd, 0, `describe('${category}', () => {`);
    writeLine(fd, 1, `it('Setup', () => {`);
    writeLine(fd, 2, `cy.visit('http://localhost:3000');`);
    writeLine(fd, 2, `cy.get('[data-name=${category}]').click();`);
    writeLine(fd, 1, `})`);
        
    fileEntries.forEach(fileEntry => {
        writeLine(fd, 1, `it('${fileEntry.description}', () => {`)
        writeLine(fd, 2, `cy.get('#${fileEntry.name.replace(".json", "")}').within(() => {`)
        writeLine(fd, 3, `cy.get('[data-method=1]').click();`)
        writeLine(fd, 3, `cy.get('[data-cy=result]').should('have.text', 'Success');`)
        writeLine(fd, 2, `})`)
        writeLine(fd, 1, `})`)
    })

    writeLine(fd, 0, `})`);
    
    fileSystem.closeSync(fd);
};

/**
 * Main
 */
readFileStructure(process.argv[2]);
generateEntries();
