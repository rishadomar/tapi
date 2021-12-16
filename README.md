## Introduction

# What are APIs

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
Read more on REST APIs https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/

# Swagger

A developer will build APIs and document the APIs available for other programs to call.
Swagger is a useful tool used to document the APIs

# Postman

Developers who use APIs find it useful to test the APIs before coding it into their programs.
Postman is a useful tool that allows you to do that.

# Tapi (Test APIs)

While the above tools are useful and indepensible to developers, Tapi is a tool to help test APIs.
Tapi is a react app which you can clone on your own server or dev machine.
Then, create a folder with API requests and expected responses.
Use Tapi to execute the APIs and compare the responses with your expected responses.
A test succeeds if the response is equal'ish to the expected response.
Equal'ish because some fields (that you specify) may be ignored. For example, generated unique IDs or datetime stamps.

## Get started with a sample API set

Expects the following to be installed:

```
node (version > 12)
npm
react (version 17.*)
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
    "api": "${BASE_URL}/users/${KEY_FROM_SETTINGS}?offset=0&limit=20",
    "method": "GET",
    "headers": { "Accept": "application/json" },
    "description": "Get all the ... for user",
    "expectedResponse": {
        "userId": "user id here",
        "invoices": [
            {
                "id": "#12345",
                "date": "*"
            }
        ]
    }
}
```

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

$(npm bin)/cypress run --record --key <CYPRESS_KEY_HERE>
Or run a specific spec by adding:
--spec "cypress/integration/Chat_spec.js"
To view in dashboard: https://dashboard.cypress.io/projects/<CYPRESS_PROJECT_ID_HERE>/runs

## Coming up

1. View diffs color coded
2. Where should cyprus run. On github page?
3. Be able to Login, then run APIs as authenticated user
4. Show error on failure of an execute. Like: 500 reason: xxxx

