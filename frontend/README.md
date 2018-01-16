# Comprio Frontend



## Dependencies

[Node.js v6.9+](https://nodejs.org/en/download/package-manager/)


## File Structure

Within the download you'll find the following file structure and contents

Once downloaded, unzip the compressed folder and you'll see something like this:

```
frontend/
├── client/                └──> All front end files are in this folder.
│     ├── app/                 └──> All custom JS scripts and HTML markup
│     ├── assets/              └──> All assets: images, fonts, i18n data
│     ├── data/                └──> Demo JSON data for app (TEMPORARY)
│     ├── styles/              └──> All the custom stylesheets (SCSS files)
│     ├── vendors/             └──> Third party libraries
│     ├── favicon.ico
│     └── index.html
├── .bowerrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── bower.json
├── gulp.config.js
├── gulpfile.js
└── package.json
└── README.md
```

Introduction to some important files:

`.bowerrc` - Sets the location for Bower dependencies

`bower.json` - The config file for Bower.

`gulp.config.js` - Contains the global config variables for Gulp tasks

`gulpfile.js` - The config file for Gulp. It is used to configure or define tasks and load Gulp plugins.

`package.json` - The config file for NPM. This file is used by npm to store metadata for projects published as npm modules.

## Usage

1. Install all the NPM packages (for development) with NPM:
```bash
npm install
```

2. Install all the front end packages with Bower:
```bash
bower install
```

3. Then type gulp serve and you are ready to go :)
```bash
gulp serve
```

By the way, if you want to build a distribution (production) version, simply run
```bash
gulp serve-dist
```

## Add a New Page
Add a New Page
To add a new page, you need to do following things:

Add a new HTML page
Add a new route
Add a new sidebar item
Let me use a example to explain this:

Say we want to add a test page with route "http://mydomain.com/index.html#/form/test"

### Add a new HTML page

Go to `./client/app/form` folder, create a "test.html" file and put some dummy content in

### Add a new route

Open `./client/app/core/config.route.js` file, add your route to `$stateProvider`

### Add a new sidebar item

Open `./client/app/core/layout/sidebar-content.html` file, add your own menu item to it

Done :)

Additionally, if you want to add some extra functionalities, you also need to create an angular controller for the page

### How to Communicate with Back end?
To communicate with API server, you can (and should) use Angular an service like [$http](https://docs.angularjs.org/api/ng/service/$http) or [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
