# TM Nucleus

![alt tag](nucleus.jpg)

## Getting Started
In your terminal, enter the following:

```bash
$ cd nucleus-app
$ npm install
$ npm start
```

We then need to compile our files, so in another terminal enter:

```bash
$ npm run prod
```
You can now view the app at http://localhost:3000

## Development Work
Same as above, except in the second terminal you will now enter:

```bash
$ npm run dev
```

This will automatically open up a new browser tab and point at the Express app. It will also monitor source files for any changes and compile them as needed. The browser will refresh automatically for changes.

### Linting
To lint SASS files, run the following command in the terminal:

```bash
$ npm run lint
```

### Distribution files
To update Nucleus's distribution files (minified css, images, fonts), run the following command:

```bash
$ npm run dist
```
