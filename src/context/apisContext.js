import * as ProjectConstants from 'projectConstants';
import { createContext, React, useEffect, useReducer, useState } from 'react';
import { matchAndReplace } from 'stringUtils';
import { reducer } from './reducer';

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [apis, dispatch] = useReducer(reducer, null);
    //const { apis } = useContext(ApiContext);
    const [settings, setSettings] = useState(null);

    /**
     * Read all API entries
     */
    const readApis = () => {
        return new Promise((resolve, reject) => {
            fetch(ProjectConstants.ALL_APIS_FILE, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw Error('Failed to fetch json. Status code: ' + response.status);
                    }
                    return response.json();
                })
                .then(function (myJson) {
                    dispatch({ type: 'SET_APIS', content: myJson });
                    resolve(true);
                })
                .catch((error) => {
                    reject('Error encountered reading: ' + ProjectConstants.ALL_APIS_FILE + ' Reason: ' + error);
                });
        });
    };

    /**
     * Read settings
     */
    useEffect(() => {
        fetch('settings.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(
                        'Failed to read settings.json. Expected this file to be in the public folder. Status code: ' + response.status
                    );
                }
                return response.json();
            })
            .then(function (settingsAsJson) {
                setSettings(settingsAsJson);
            })
            .catch((error) => {
                setSettings({});
                console.log('Error encountered. ', error.message);
            });
    }, []);

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
     * Build a query string.
     * @param {*} jsonObject
     * @returns
     */
    const makeQueryString = (jsonObject) => {
        let queryString = '';
        Object.keys(jsonObject).forEach((key) => {
            if (queryString.length === 0) {
                queryString += '?';
            } else {
                queryString += '&';
            }
            queryString += key + '=' + JSON.stringify(jsonObject[key]);
        });
        return queryString;
    };

    // eslint-disable-next-line no-unused-vars
    const _makeQueryString = (jsonObject) => {
        let searchParams = new URLSearchParams('');
        Object.keys(jsonObject).forEach((key) => {
            searchParams.set(key, JSON.stringify(jsonObject[key]));
        });
        return searchParams.toString();
    };

    const codeExplanation = (code) => {
        switch (code) {
            case 400:
                return 'Bad Request. Client sent an invalid request, such as lacking required request body or parameter';

            case 401:
                return 'Unauthorized. Client failed to authenticate with the server';

            case 403:
                return 'Forbidden. Client authenticated but does not have permission to access the requested resource';

            case 404:
                return 'Not Found. The requested resource does not exist';

            case 412:
                return 'Precondition Failed. One or more conditions in the request header fields evaluated to false';

            case 500:
                return 'Internal Server Error. A generic error occurred on the server';

            case 503:
                return 'Service Unavailable. The requested service is not available';

            default:
                return 'Unknown';
        }
    }

    /**
     * Execute the API
     * @param {*} entry
     */
    const executeApi = (entry) => {
        return new Promise((resolve, reject) => {
            console.log('Execute the api: ', entry, settings);
            let newEntryDetails = { ...entry };
            newEntryDetails.status = 'Busy';

            //
            // Replace the Settings values
            //
            let url = entry.api;
            for (var key of Object.keys(settings)) {
                url = url.replace('${' + key + '}', settings[key]);
            }

            //
            // Replace Previous result
            //
            if (apis.previousResults) {
                url = matchAndReplace(url, /\$\{PREVIOUS_RESULT./g, apis.previousResults);
            }

            //
            // Add any parameters
            //
            if (entry.parameters) {
                url += makeQueryString(entry.parameters);
            }

            //
            // Setup headers
            //
            let fetchDetails = {
                method: entry.method
            };
            if (entry.headers) {
                fetchDetails['headers'] = entry.headers;
            }
            if (entry.body) {
                fetchDetails['body'] = JSON.stringify(entry.body);
            }
            console.log('Fetch Details', fetchDetails);
            console.log('url', url);

            //
            // Fetch
            //
            fetch(url, fetchDetails)
                .then(function (response) {
                    newEntryDetails.actualResponseId = response.status;
                    
                    if (response.ok) {
                        // Success
                        return response.json();
                    }

                    // Failed
                    if (!entry.expectedResponseId || response.status != entry.expectedResponseId) {
                        // Not expected to fail OR the failure code received was not the one that was expected.
                        throw Error('API failed. Code: ' + newEntryDetails.actualResponseId + ' Explanation: ' + codeExplanation(newEntryDetails.actualResponseId));
                    }

                    // Failed but expected to fail with correct failure code
                    if (entry.expectedResponse) {
                        // Expecting some Json response
                        return response.json();
                    }

                    // Expected failure but no JSON expected back
                    return Promise.resolve(null);
                })
                .then(function (resultAsJson) {
                    newEntryDetails.api = url;
                    newEntryDetails.executeResult = resultAsJson;
                    dispatch({
                        type: 'SET_RESULT_OF_LAST_API_REQUEST',
                        testCase: entry.name,
                        resultAsJson
                    });
                    if ((!resultAsJson && !entry.expectedResponse) || objectEquals(entry.expectedResponse, resultAsJson)) {
                        newEntryDetails.status = 'Success';
                        console.log('Same: ', entry.expectedResponse, resultAsJson);
                    } else {
                        newEntryDetails.status = 'Diff';
                        console.log('Different: ', entry.expectedResponse, resultAsJson);
                    }
                    dispatch({
                        type: 'UPDATE_API',
                        updatedApiEntry: newEntryDetails
                    });
                    resolve();
                })
                .catch((error) => {
                    console.log('Error encountered. ', error.message);
                    newEntryDetails.status = 'Failed';
                    dispatch({
                        type: 'UPDATE_API',
                        updatedApiEntry: newEntryDetails
                    });
                    reject(error);
                });
        });
    };

    return <ApiContext.Provider value={{ readApis, apis, executeApi }}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
