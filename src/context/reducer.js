export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_APIS':
            return { content: action.content };

        case 'SET_RESULT_OF_LAST_API_REQUEST': {
            let newSetOfResults;
            if (state.previousResults) {
                newSetOfResults = [...state.previousResults];
            } else {
                newSetOfResults = [];
            }
            const newEntry = {
                testCase: action.testCase,
                result: { ...action.resultAsJson }
            };
            newSetOfResults.push(newEntry);
            return { ...state, previousResults: newSetOfResults };
        }

        case 'UPDATE_API': {
            const updateApi = (folder, id, updatedApiEntry) => {
                for (let j = 0; j < folder.entries.length; j++) {
                    const entry = folder.entries[j];
                    if (entry.id === id) {
                        const newValues = [...folder.entries];
                        newValues.splice(j, 1, updatedApiEntry);
                        folder.entries = newValues;
                        break;
                    }
                }
            };

            if (state.content === null) {
                return state;
            }

            const newContent = { ...state.content };

            for (let e = 0; e < newContent.entries.length; e++) {

                if (newContent.entries[e].type === 'Folder') {
                    updateApi(
                        newContent.entries[e], 
                        action.updatedApiEntry.id, 
                        action.updatedApiEntry);
                }
            }
            return { ...state, content: newContent };
        }

        default:
            return state;
    }
};
