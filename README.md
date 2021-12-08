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

Read more about Swagger: https://swagger.io/

# Postman

Developers who use APIs find it useful to test the APIs before coding it into their programs.
Postman is a useful tool that allows you to do that.
Read more about Postman: https://www.postman.com/

There's even Postwoman which is now https://hoppscotch.io/

# Tapi (Test APIs)

While the above tools are useful and indepensible to developers I needed a tool to help me test the APIs
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
cypress (version 9.1.*) ... optional
```

```sh
git clone git@gitlab.com:aux-studio/api-tester.git
cd api-tester
npm install
optional clean: rm -f public/all-apis.json public/settings.json cypress/integration/*
npm run extractAllApis example
npm run generateCypressTests example
npm start
npm run cypress:open
To run headless: $(npm bin)/cypress run 
```

## Create your own API data files
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
                "date": "*",
            }
        ]
    }
}
```

## Cypress dashboard
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


## For Mediclinic API

Use this as base:
https://devecaapi01.mediclinic.co.za/index.html

Add your APIs in data folder.
Use subfolders to categorise your APIs.
Look at the example APIs to build your own.
Create a .env file in data folder with variables that you wish to replace in your data APIs.
On any change to the data folder, run:
npm run extractAllApis
This will generate public/all-apis.json which is consumed by the app.

## Coming up

1. View expected result vs got result side by side (instead of below each other)
2. View diffs color coded
3. Add more cyprus tests for remaining tests
6. Move this repo to github
7. Write a getting started guide
8. Where should cyprus run. On github page?
9. Be able to Login for MyChat, then run APIs as authenticated user
10. Show error on failure of an execute. Like: 500 reason: xxxx
11. Show URL (+ final URl with replaced values) being run

## Cyprus docs

https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Actionability

## Eslint + Prettier

https://gist.github.com/bradtraversy/aab26d1e8983d9f8d79be1a9ca894ab4
