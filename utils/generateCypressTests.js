const fileSystem = require('fs');
const { readFileStructure } = require('./readFolder');

const GeneratedTestInPath = 'cypress/integration/';

/**
 * Generate 
 */
const generateEntries = (jsonFileEntries) => {
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
        writeLine(fd, 1, `it("${fileEntry.description}", () => {`)
        writeLine(fd, 2, `cy.get('#${fileEntry.name}').within(() => {`)
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
let jsonFileEntries = [];
let counter = 0;
readFileStructure({jsonFileEntries, counter}, process.argv[2]);
generateEntries(jsonFileEntries);
