# Get started

npm install
npm start

# Dev

Add your APIs in data folder.
Use subfolders to categorise your APIs.
Look at the example APIs to build your own.
Create a .env file in data folder with variables that you wish to replace in your data APIs.
On any change to the data folder, run:
npm run extractAllApis
This will generate public/all-apis.json which is consumed by the app.

# Coming up

1. use useReducer instead of useState

2. Scrollbar

3. Good examples

GET list
GET 1 entry
POST Delete
POST Update

4. Use this to test MyChat API

5. How to fork for each new project and yet be able to merge back

6. Styling

7. Diff the result vs expected, and show diff

8. Use cypress to actually run the tests

9. Be able to Login for MyChat, then run APIs as authenticated user
