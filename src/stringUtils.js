
/**
 * Match and replace
 * @param str 
 * @param values 
 * @returns 
 * 
 * See example below
 */

export const matchAndReplace = (str, regexp, valueSet) => {
    const matches = str.matchAll(regexp);
    let resultMatches = [];

    for (const match of matches) {
        //console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
        const endPos = str.indexOf('}', match.index);
        const fullMatch = str.substring(match.index + 2, endPos);
        const fieldsPosition = fullMatch.indexOf('.');
        const parts = fullMatch.substring(fieldsPosition + 1).split('.');
        const values = valueSet.find(v => v.testCase === parts[0]);
        if (values) {
            let value = values.result;
            for (let i = 1; i < parts.length; i++) {
                value = value[parts[i]];
            }
            resultMatches.push({field: str.substring(match.index, endPos + 1), value});
        }
    }

    let resultStr = str;
    resultMatches.forEach(resultMatch => {
        resultStr = resultStr.replace(resultMatch.field, resultMatch.value);
    })

    return resultStr;
}


/**
 * Example test
const url = 'abcdef/${PREVIOUS_RESULT.1-registerUser._id}?name=${PREVIOUS_RESULT.1-registerUser.name}&city=${PREVIOUS_RESULT.2-updateUser.address.city}';
const previousResultValues = [
    {
        testCase: '1-registerUser',
        result: {
            _id: 1234567890,
            name: 'Hello World',
            address: {
                street: 'Taronga Road',
                city: 'Cape Town'
            }
        }
    },
    {
        testCase: '2-updateUser',
        result: {
            address: {
                street: 'Taronga Road',
                city: 'Cape Town'
            }
        }
    },

]
const r = matchAndReplace(url, /\$\{PREVIOUS_RESULT./g, previousResultValues);
console.log(r);
*/