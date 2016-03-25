# TM Nucleus

![alt tag](nucleus.jpg)

## Changelog
Release notes can be found in our [changelog](CHANGELOG.md).

## Dependencies
**node** - v0.12.7. If you need to run a different version of node for other projects, check out either [nvm](https://www.npmjs.com/package/nvm) or [n](https://github.com/tj/n).

**scss lint** - 0.41.0.

To install:

```
$ gem install scss_lint -v 0.41.0
```

**gulp** - Gulp comes as part of the `package.json` and is accessed via the `npm run` commands above. However, if you wish to run individual gulp tasks directly from the command line, you'll need to install the cli.

```
$ npm install --global gulp
```

**svg4everybody** - IE9-12 do not recognize externally referenced SVG files, so we use this polyfill to fill the gap. The minified version of the polyfill is included with the project. For more information, see: [svg4everybody](https://github.com/jonathantneal/svg4everybody)

## Getting Started
In your terminal, enter the following from within the nucleus directory:

```
$ npm install
$ npm run app
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

## License
MIT License
