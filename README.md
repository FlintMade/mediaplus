# mediaplussea.com

This repo belongs to a Wordpress site, but tracks only the relevant theme and a couple housekeeping-esque files. To work on the project, you will need to get the rest of the Wordpress instance from the server, as well as the current database. Instructions for setting up a local environment: [Mac](https://codex.wordpress.org/Installing_WordPress_Locally_on_Your_Mac_With_MAMP) and [PC](https://premium.wpmudev.org/blog/setting-up-xampp/).

## Project dependencies

Besides running on Wordpress, this project uses Grunt to minify and concatenate Sass files and JavaScript files. You’ll need [Ruby](https://www.ruby-lang.org/en/downloads/) installed to use Sass, and you’ll need [Node](https://nodejs.org/en/) (current version is fine) for Grunt.

Once you have these dependencies installed, navigate to the root of the project via the command line and run `npm install` to install the Grunt task dependencies. Then run `grunt watch`. You will need to run this command once per development session where you are making changes to Sass and JavaScript files. Otherwise, your changes will not be reflected in the compiled CSS and JS files.

## Various notes

### .htaccess

The `.htaccess` file in the root of the project is just for the development environment. The `.prodhtaccess` file has all your caching etc.

### "Flow"

Flow pages refer to the home page, expertise case studies, and offerings case studies. Anywhere you see a class `.flow`, refers to all these pages.

### Assets

* CSS and JS are loaded through enqueue functions in `functions.php`
* Most SVGs are accessed from the `svgs` directory in the `mediaplus-2017` theme folder. In the case of SVGs that didn't need multi-color, state-dependent styling and/or were repeated multiple times in the DOM, those can be found in `mediaplus-2017/assets/images/sprite.svg` and are accessed via `<use>` tags.