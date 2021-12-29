# Tapi a tool to test APIs

## What are APIs

APIs are used extensively in Programming.
I see APIs as Requests and Questions
For example: Hey system, add this new contact to your database.
Here are the details:
Name: Joe Bloggs
DOB: 19890811

And the system replies: Successfully added
Or maybe Unsuccessful adding new contact. The contact number is missing.

APIs use many formats and underlying architectures to make such requests and receive responses.
This project focuses on APIs that use the REST format.

## What happens when the API changes

For example: in the above case the API no longer returns DOB, but instead returns DateOfBirth.
Your application depends on receiving DOB. And so, it no longer behaves as expected since the API has changed.

Tapi is the tool to address this. It does not fix the problem, but Tapi makes you aware of the change so that you can act on it.

## Other useful API tools: Swagger & Postman

A developer will build APIs and document the APIs available for other programs to call.
Swagger is a useful tool used to document the APIs

Developers who use APIs find it useful to test the APIs before coding it into their programs.
Postman is a useful tool that allows you to do that.

Tapi has drawn ideas from these 2 tools.

## What is Tapi

While the above tools are useful and indepensible to developers, Tapi is a tool to help test APIs continuously.
Tapi is a react app which you can clone on your own server or a dev machine.
(No coding experience is necessary)
Then, create a folder with API requests and expected responses.
Use Tapi to execute the APIs and compare the responses with your expected responses.
A test succeeds if the response is equal'ish to the expected response.
Equal'ish because some fields (that you specify) may be ignored. For example, generated unique IDs or datetime stamps.

Tapi utilises a react app to provide a GUI to the tests.
Tapi also uses cypress to run these tests hands free.

## Get started with a sample API set

Expects the following to be installed:

```
node (version > 12)
npm
react (version 17.*)
No coding experience is necessary but some basic knowledge of reading and writing JSON files is required.
```

```sh
git clone https://github.com/rishadomar/tapi.git
cd tapi
npm install
rm -rf cypress/* # Clean up sample projects. Tapi will generate Test scripts for you.
rm -f public/all-apis.json public/settings.json cypress/integration/* # A regular clean to run before switching data sources
npm run extractAllApis example # "example" is a the sample folder of data. You can specify the folder that contains your API specs.
npm run generateCypressTests example
npm start # Run the GUI. Test your APIs manually
npm run cypress:open # Run a GUI and execute your tests hands-free!
$(npm bin)/cypress run # Run on the console with no GUI. Typically, this is added to your CI/CD.
```

## Create your own API data files

Look at the example folder included in this repo to see some examples.

```sh
cd PATH_TO_YOUR_DATA_FOLDER
Create settings.json
```

```json
{
    "BASE_URL": "https://...",
    "ANY_OTHER_VARIABLE_KEY": "SOME VALUE"
}
```

```sh
Add folders with API files in each folder
Example of an API file:
```

```json
{
    "api": "${BASE_URL}/user/invoices/${PREVIOUS_RESULT.1-registerUser._id?key=${KEY_FROM_SETTINGS}&offset=0&limit=20",
    "method": "GET",
    "headers": { "Accept": "application/json" },
    "description": "Get the first 20 invoices of specified user",
    "expectedResponse": {
        "user": {
            "userId": "*",
            "userName": "Joe Bloggs"
        },
        "invoices": [
            {
                "date": "*",
                "amount": "123.98"
            },
            {
                "date": "*",
                "amount": "565.88"
            }
        ]
    }
}
```

Some things to note:

1) The "*" in userId means that you don't care what the value of the userId is. Typically, this will be different
each time a user is created.

2) ${KEY_FROM_SETTINGS} is a value specified in the settings.json.

3) ${PREVIOUS_RESULT.1-registerUser._id is a value returned by a previous request. The name of the previous request is 1-registerUser
and the response contained a value "_id".
This implies that the sequence the tests are run is significant. Name your tests with a number to sequence them appropriately.

## Cypress dashboard (optional)

Login and register with Cypress
Create a new project and copy the key and projectId provided
Add a cypress.json in the root of the project and add the projectId

```json
{
    "projectId": "<CYPRESS_PROJECT_ID_HERE>",
    "component": {
        "testFiles": "**/*.test.{js,ts,jsx,tsx}",
        "componentFolder": "src"
    }
}
```

```
$(npm bin)/cypress run --record --key <CYPRESS_KEY_HERE>
Or run a specific spec by adding:
    --spec "cypress/integration/Chat_spec.js"
To view in dashboard: https://dashboard.cypress.io/projects/<CYPRESS_PROJECT_ID_HERE>/runs
```

## Use Tapi for Free

Tapi is a community project. Use it for free.
If you do make changes consider pushing back the changes via a Pull Request.
Otherwise, add issues or contact me for changes. rishadomar@gmail.com

## Coming up

1. View diffs color coded
2. Be able to Login, then run APIs as authenticated user
3. Show error on failure of an execute. Like: 500 reason: xxxx

