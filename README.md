## Get started

git clone
npm install
npm start
npm extractAllApis PATH_TO_YOUR_DATA_FOLDER
run generateCypressTests PATH_TO_YOUR_DATA_FOLDER
run cleanCypressTests
npm run cypress:open

## Cypress dashboard
Login and register with Cypress
Create a new project and copy the key and projectId provided
Add a cypress.json in the root of the project and add the projectId
```json
{
  "projectId": "bvchgq"
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
4. Run cyprus via command line
5. Move data folder out of repo into its own repo. Then link it in.
6. Move this repo to github
7. Write a getting started guide
8. Where should cyprus run. On github page?
9. Be able to Login for MyChat, then run APIs as authenticated user

## Cyprus docs

https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Actionability

## Eslint + Prettier

https://gist.github.com/bradtraversy/aab26d1e8983d9f8d79be1a9ca894ab4
