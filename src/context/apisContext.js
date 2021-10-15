import { createContext, useState } from 'react';
import * as ProjectConstants from 'projectConstants';
export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [apis, setApis] = useState(null);

    const readApis = () => {
        fetch(ProjectConstants.ALL_APIS_FILE, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(
                        'Failed to fetch json. Status code: ' + response.status
                    );
                }
                return response.json();
            })
            .then(function (myJson) {
                setTimeout(() => setApis(myJson), 1000);
            })
            .catch((error) => {
                console.log('Error encountered. ', error.message);
            });
    };

    const updateApiEntry = (updatedApiEntry) => {
        if (apis === null) {
            return;
        }
        const a = apis.findIndex((entry) => entry.id === updatedApiEntry.id);
        if (a < 0) {
            return;
        }
        setApis((currentValues) => {
            const newValues = [...currentValues];
            newValues.splice(a, 1, updatedApiEntry);
            return newValues;
        });
    };

    // const getAllApis = () => {
    //     return apis;
    // };

    const getApiDetail = (i) => {
        return apis[i];
    };

    const executeApi = (entry) => {
        console.log('Execute the api: ', entry);
        let newEntryDetails = { ...entry };
        newEntryDetails.status = 'Tried';
        updateApiEntry(newEntryDetails);
    };

    return (
        <ApiContext.Provider
            value={{ readApis, apis, getApiDetail, executeApi }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export default ApiProvider;
