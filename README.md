# Repository for the documentation site for the Frontend styleguide - version 2.0.0


This repo includes code and documentation for the Frontend Styleguide. This styleguide is based on [U.S. Web Design Standards](https://standards.usa.gov/).

The documentation site can be found [here](https://fsgpilot.github.io/frontend-styleguide/).

The components project can be found [here](https://github.com/FSGpilot/frontend-styleguide-components).

## Running locally

The Style Guide documentation is built using Jekyll for the file framework, gulp for task management, and the node module for the Standards.


### Before you start

You will need to have the following installed on your machine before following the commands below:

1. Ruby v2.2.2+, [Installation guides](https://www.ruby-lang.org/en/documentation/installation/)
1. Node v4.2.3+, [Installation guides](https://nodejs.org/en/download/)
1. Bundler v1.12.3+, [Installation guides](http://bundler.io/v1.13/guides/using_bundler_in_application.html#getting-started---installing-bundler-and-bundle-init)


### Building the documentation with gulp

Some parts of the documentation are built using [gulp](http://gulpjs.com/).

To work on the site, switch to your local copy of the repository in terminal then run the following command to install project dependencies:

```sh
npm install
```

Now that all of your dependencies are installed, you can run your local server by running the following command:

```sh
npm start
```

Go to `127.0.0.1:4000` in your browser — you should be viewing a local instance.

Here are a few other utility commands you may find useful:

- `npm run clean`: Cleans out copied-over dependency assets.

- `npm run lint`: Runs `eslint` and `sass-lint` against JavaScript and Sass files.

- `npm test`: Runs `npm run lint` and can also be used to run any tests.

- `npm run watch`: Runs a series of commands that watches for any changes in both the Standards node module and the root level asset folders in this repo.