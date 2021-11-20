import Settings from 'data/settings.json';
import * as ProjectConstants from 'projectConstants';
import { createContext, React, useReducer } from 'react';
import { reducer } from './reducer';

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [apis, dispatch] = useReducer(reducer, null);

    /**
     * Read all API entries
     */
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
                setTimeout(
                    () => dispatch({ type: 'SET_APIS', entries: myJson }),
                    1000
                );
            })
            .catch((error) => {
                console.log('Error encountered. ', error.message);
            });
    };

    /**
     * Check if there is a diff
     * Copied from: https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
     * @param {*} entry
     */
    const objectEquals = (x, y) => {
        // optional
        if (x === '?') {
            return true;
        }

        if (x === null || x === undefined || y === null || y === undefined) {
            return x === y;
        }

        // don't care what the value is
        if (x === '*') {
            return true;
        }

        // after this just checking type of one would be enough
        if (x.constructor !== y.constructor) {
            return false;
        }
        // if they are functions, they should exactly refer to same one (because of closures)
        if (x instanceof Function) {
            return x === y;
        }
        // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
        if (x instanceof RegExp) {
            return x === y;
        }
        if (x === y || x.valueOf() === y.valueOf()) {
            return true;
        }
        if (Array.isArray(x) && x.length !== y.length) {
            return false;
        }

        // if they are dates, they must had equal valueOf
        if (x instanceof Date) {
            return false;
        }

        // if they are strictly equal, they both need to be object at least
        if (!(x instanceof Object)) {
            return false;
        }
        if (!(y instanceof Object)) {
            return false;
        }

        // recursive object equality check
        var p = Object.keys(x);
        return (
            Object.keys(y).every(function (i) {
                return p.indexOf(i) !== -1;
            }) &&
            p.every(function (i) {
                return objectEquals(x[i], y[i]);
            })
        );
    };

    /**
     * Execute the API
     * @param {*} entry
     */
    const executeApi = (entry) => {
        console.log('Execute the api: ', entry, Settings);
        let newEntryDetails = { ...entry };
        newEntryDetails.status = 'Busy';

        //
        // Replace the Settings values
        //
        let url = entry.api;
        for (var key of Object.keys(Settings)) {
            url = url.replace('${' + key + '}', Settings[key]);
        }

        let fetchDetails = {
            method: entry.method,
        };
        if (entry.headers) {
            fetchDetails['headers'] = entry.headers;
        }
        if (entry.body) {
            fetchDetails['body'] = JSON.stringify(entry.body);
        }
        console.log('Fetch Details', fetchDetails);
        fetch(url, fetchDetails)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(
                        'Failed to execute API. Status code: ' + response.status
                    );
                }
                return response.json();
            })
            .then(function (myJson) {
                newEntryDetails.executeResult = myJson;

                if (objectEquals(entry.expectedResponse, myJson)) {
                    newEntryDetails.status = 'Success';
                    console.log('Same: ', entry.expectedResponse, myJson);
                } else {
                    newEntryDetails.status = 'Diff';
                    console.log('Different: ', entry.expectedResponse, myJson);
                }
                setTimeout(
                    () =>
                        dispatch({
                            type: 'UPDATE_API',
                            updatedApiEntry: newEntryDetails,
                        }),
                    3000
                );
            })
            .catch((error) => {
                console.log('Error encountered. ', error.message);
                newEntryDetails.status = 'Failed';
                newEntryDetails.executeResult = null;
                setTimeout(
                    () =>
                        dispatch({
                            type: 'UPDATE_API',
                            updatedApiEntry: newEntryDetails,
                        }),
                    3000
                );
            });
    };

    return (
        <ApiContext.Provider value={{ readApis, apis, executeApi }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiProvider;
