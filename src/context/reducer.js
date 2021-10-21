export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_APIS':
            return { apis: action.apis };

        case 'UPDATE_API': {
            if (state.apis === null) {
                return state;
            }
            const a = state.apis.findIndex(
                (entry) => entry.id === action.updatedApiEntry.id
            );
            if (a < 0) {
                return state;
            }
            const newValues = [...state.apis];
            newValues.splice(a, 1, action.updatedApiEntry);
            return { ...state, apis: newValues };
        }

        default:
            return state;
    }
};
