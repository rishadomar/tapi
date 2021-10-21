export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_APIS':
            return { entries: action.entries };

        case 'UPDATE_API': {
            if (state.entries === null) {
                return state;
            }
            const a = state.entries.findIndex(
                (entry) => entry.id === action.updatedApiEntry.id
            );
            if (a < 0) {
                return state;
            }
            const newValues = [...state.entries];
            newValues.splice(a, 1, action.updatedApiEntry);
            return { ...state, entries: newValues };
        }

        default:
            return state;
    }
};
