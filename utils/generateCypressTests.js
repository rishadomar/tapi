const fileSystem = require('fs');
const { exit } = require('process');
const { readFileStructure } = require('./readFolder');

const GeneratedTestInPath = 'cypress/integration/';

/**
 * Generate 
 */
const generateEntries = (content) => {
    content.entries.forEach((entry) => {
        if (entry.type === 'Folder' && entry.entries.length > 0) {
            writeEntries(entry.name, entry.entries);
        }
    });
};

/**
 * Write entries for category
 * @param {*} category 
 * @param {*} fileEntries 
 */
const writeEntries = (name, fileEntries) => {
    const writeLine = (fd, tabs, line) => {
        let tabLine = '';
        for (let i = 0; i < tabs; i++) {
            tabLine += '\t';
        }
        fileSystem.writeSync(fd, tabLine + line + '\n');
    }

    const nameParts = name.split('/');
    const dir = GeneratedTestInPath + '/' + nameParts.splice(nameParts, nameParts.length - 1).join('/');
    if (!fileSystem.existsSync(dir)){
        fileSystem.mkdirSync(dir, { recursive: true });
    }
    const category = nameParts[nameParts.length - 1];
    const fd = fileSystem.openSync(`${dir}/${category}_spec.js`, 'w');
    
    writeLine(fd, 0, `describe('${name}', () => {`);
    writeLine(fd, 1, `it('Setup', () => {`);
    writeLine(fd, 2, `cy.visit('http://localhost:3000');`);
    writeLine(fd, 2, `cy.get('[data-name="${name}"]').click();`);
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
 if (!process.argv[2]) {
    console.error("Please specify path to your data folder.");
    exit(-1);
}
let content = {name: '', type: 'Folder', counter: 0, entries: []};
readFileStructure(process.argv[2], content);
generateEntries(content);
