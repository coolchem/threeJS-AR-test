

#### About
- This is a basic starter template for getting quick start on full featured web application written in [Typescript](https://www.typescriptlang.org/index.html) and using [Webpack](https://webpack.js.org/).
- This template also include full Software Development Lifecycle support. Which means you can quickly develop, test and deploy your application to production


#### How to use this template

1. Using [Raappid](https://github.com/coolchem/raappid), a project scaffolding tool.

    1. install raappid if not already installed: 
    
        ```
        npm install -g raappid
        ```
        
    2. In your terminal go to to directory where you want to create your project and run command
    
       ```
        raappid web-app project-name
       ```

2. Clone or download the repository and run command as below to setup all your dependencies

    ```
    npm install 
    ```

#### Features
- No Frontend Framework is used. The choice is yours.
- Styling is Powered by [Sass](http://sass-lang.com/)  
- API is powered by [Express](http://expressjs.com/) 
- Development features
    - [Webpack](https://webpack.js.org/) for module management. [Docs](https://webpack.js.org/configuration/)   
    - Live reload.
    - Unit Testing with Karma and Code coverage support.
    - E2E Automated testing configured with [Protractor](http://www.protractortest.org/#/). Yes It can be used with non-angular apps.
    - Continuous Integration (CI) configured to be used with [Travis CI](https://travis-ci.org/);
    - Code Coverage reporting configured to be used with [Coveralls](https://coveralls.io) 

- Configured to release project to Github.
- Configured to deploy your application directly to [Heroku](https://www.heroku.com/), from production branch 
 
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
 
### Detailed Documentation:
   
-  [Start Developing](template-docs/development.md)
-  [Setup Continuous Integration](template-docs/CI.md)
-  [Release Project](template-docs/release.md)
-  [Setup Heroku Deployment](template-docs/deploy.md)

    
#    
Below are some place holders on how to write a README.md makdown document.    
    

# Project-Name

## big Headline

### Small Headline

[This is s link](http://google.com)

```
This is a well
```

#### Numbered List

1. First Item
    ```
    well
    ```

2. Second Item
    ```
    well
    ```
    #### heading
    some thing

### Bullet points

- I am a bullet point


