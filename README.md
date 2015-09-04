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

## Dependencies
This project requires Gulp 4. At the time of this writing, v4 hasn't been
officially released by the Gulp team, so you'll need to grab it manually.

If you already have a previous version of the Gulp CLI installed on your machine,
you'll need to uninstall it via the following command:

```bash
$ npm uninstall gulp -g
```

Now let's install v4's CLI:

```bash
$ npm install "gulpjs/gulp-cli#4.0" -g
```

You should now be good to go!
