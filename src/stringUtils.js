
/**
 * Match and replace
 * @param str 
 * @param values 
 * @returns 
 * 
 * For example:
    const url = 'abcdef/${PREVIOUS_RESULT._id}?name=${PREVIOUS_RESULT.name}&city=${PREVIOUS_RESULT.address.city}';
    const previousResultValues = {
        _id: 1234567890,
        name: 'Hello World',
        address: {
            street: 'Taronga Road',
            city: 'Cape Town'
        }
    }
    const r = matchAndReplace(url, /\$\{PREVIOUS_RESULT./g, previousResultValues);
    console.log(r);
    // Note: city not working yet
 */

export const matchAndReplace = (str, regexp, values) => {
    const matches = str.matchAll(regexp);
    let resultMatches = [];

    for (const match of matches) {
        //console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
        const endPos = str.indexOf('}', match.index);
        const fullMatch = str.substring(match.index + 2, endPos);
        const fieldPosition = fullMatch.indexOf('.');
        const field = fullMatch.substring(fieldPosition + 1);
        resultMatches.push({field: str.substring(match.index, endPos + 1), value: values[field]});
    }

    let resultStr = str;
    resultMatches.forEach(resultMatch => {
        resultStr = resultStr.replace(resultMatch.field, resultMatch.value);
    })

    return resultStr;
}


