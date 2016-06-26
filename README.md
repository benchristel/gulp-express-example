# Gulp 4 + Express Example

This repo demonstrates my current opinions on how to build an Express webapp using Gulp 4. Currently it is rather complex and possibly slow; expect it to get faster and then simpler.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

**Features:**

- Compiles [ES2015](https://babeljs.io/docs/learn-es2015/) to backwards-compatible ES3. Sourcemaps included!
- Uses [Browserify](http://browserify.org/) to pack the tree of `require`d files into a single, minified JS file that can be run in a browser.
- Runs tests with [Jasmine](http://jasmine.github.io/2.4/introduction.html).
- [ESLint](http://eslint.org/) enforces [Standard JS style](http://standardjs.com).
- Dependency injection with [Yavanna](https://www.npmjs.com/package/@benchristel/yavanna) makes unit-testing a breeze, and saves you from having to change your `require`s when you want to move or rename a source file.
- The `gulp watch` task rebuilds the app and runs the tests and linter on every file change for the tightest possible feedback loop.

## Getting Started

If you want to use this repo as a template for your own project, you can clone the latest version and reinitialize the repository:

```bash
git clone --depth=1 https://github.com/benchristel/gulp-express-example.git myproject
cd myproject
mv .git /tmp # because `rm -rf` is for crazy people
git init
```

### Install Node via Homebrew

```bash
brew install node
```

### Install Gulp 4

The `-g` flag installs the CLI globally, making the `gulp` executable available on your `PATH`.

```bash
npm install -g gulpjs/gulp-cli
```

### Install Project Dependencies

```bash
npm install # must be run inside your project directory
```

### Start building!

```bash
gulp watch --silent # suppress gulp output cruft
```

## Possibly missing features

- Support for building CLI apps
- An option to build a production version of the app with minified browser code (I originally had `uglify` in the normal build pipeline, but it was too slow to use for development)
