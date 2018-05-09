# React Redux with React-Router-Redux Stocks and News
- Webpack 3.11.0
- Redux
- Integrated React-Router-Redux 5.0
- Stylus CSS library
- Fetches news on a stock from Webhose, Guardian, and NewsApi
- Fetches stock data and display in a stock chart, using AlphaVantage Api, and React-Stockcharts library
- Firebase Database example
- Firebase Firestore example
- Separate Dev and Prod environment setup
- Globally used colors in styles/colors.js
- Global styles in styles/styles.styl
- Axios library to fetch requests
- Uses OpenBrowserPlugin to open page in browser upon startup

![github3](https://user-images.githubusercontent.com/34944774/38452983-6a5a29f4-3a1c-11e8-9895-fa092e8c6b9d.png)

# To Run:

Unzip files/Github clone.

Make sure you have 'npm' and 'yarn' installed.

Navigate to the folder level where package.json is in console and run 'npm install' or 'yarn install' while will download node_modules.

After 'npm install'/'yarn install' finishes running, run in the same place 'npm start' or 'npm run dev'. A webpage should auto open in browser.

#Useful Pluggins for VS Code : 'Auto Close Tag', 'Auto Import', 'TODO Highlight', 'language-stylus'

#If you prefer SCSS over Stylus:
- yarn add node-sass
- yarn add sass-loader
- get rid of stylus-loader in package.json or remove it through command line
- change webpack files, prod and dev to recognize sass/scss
- change the ending of your styling files from '.styl' across the project

#Useful VS Code keyboard shortcuts to know: 
- Indent-left/Indent Right: 'Ctrl + [' and 'ctrl + ]' on selected selected lines.
- Format Document: Windows-> 'Shift + Alt + F'. Max-> 'Shift + Option + F'. Ubuntu-> 'Ctrl + Shift + I'.
- Multi Line comments: Windows-> 'Ctrl + /'. Mac-> 'Command ⌘ + /'.  on selected lines. Multiple line comments are easier to uncomment sections of with keyboard commands then using '/*', '*/' syntax.

#TODO before launch:
- figure out a way to have both local and global styl files working simultaneously.