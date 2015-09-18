# TM Nucleus

![alt tag](nucleus.jpg)

## Getting Started
In your terminal, enter the following from within the nucleus directory:

```
$ npm install
$ npm start
```

We then need to compile our files, so in another terminal enter:

```
$ npm run build
```
You can now view Nucleus at: http://localhost:3000

## Development Work
Same as above, except in the second terminal you will now enter:

```
$ npm run dev
```

This will automatically open up a new browser tab with Nucleus loaded. It will also monitor source files for any changes and compile them as needed. The browser will refresh automatically for changes.

### Linting
To lint SASS files, run the following command in the terminal:

```
$ npm run lint
```

### Distribution files
To update Nucleus's distribution files (minified css, images, fonts), run the following command:

```
$ npm run dist
```

## Dependencies
**node v0.12.7** - If you need to run a different version of node for other projects, check out either [nvm](https://www.npmjs.com/package/nvm) or [n](https://github.com/tj/n).

**scss lint** - We are currently using 0.41.0.

To install:

```
$ gem install scss_lint
```

**gulp** - Gulp comes as part of the `package.json` and is accessed via the `npm run` commands above. However, if you wish to run individual gulp tasks directly from the command line, you'll need to install the cli.

```
$ npm install --global gulp
```
