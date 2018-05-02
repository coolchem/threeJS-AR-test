
# Development Guide

#### To start developing

1. Open terminal and Change directory to your project directory

2. if the dependencies are not installed in the project run

    ```
    npm install 
    ```
3. Start your development server by running:
       ```
       npm run develop
       ``` 
4. Open your app in your Favourite Browser

5. Since Live reload is enabled, any Code changes will be picked up and your app will be automatically refreshed.

#### To Test

1. To run test cases: <b>npm run test</b>

2. Coverage report is generated and put in <b>coverage</b> folder

1. To run End to End Test cases: <b>npm run test-e2e</b>

2. Report is generated and put in <b>reporters/e2e</b> folder


##### Notes:
- All Styling is Done using Sass, if you want to use custom css file put it in <b>client/libs</b> folder 
- All Scripts are written in TypeScript if you want to use custom javascript library, put it in <b>client/libs</b> or <b>api/libs</b> folder     