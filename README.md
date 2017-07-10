# mediaplussea.com

## Various notes

### .htaccess

The `.htaccess` file in the root of the project is just for the development environment. The `.prodhtaccess` file has all your caching etc.

### "Flow"

Flow pages refer to the home page, expertise case studies, and offerings case studies. Anywhere you see a class `.flow`, refers to all these pages.

### Assets

* CSS and JS are loaded through enqueue functions in `functions.php`
* Most SVGs are accessed from the `svgs` directory in the `mediaplus-2017` theme folder. In the case of SVGs that didn't need multi-color, state-dependent styling and/or were repeated multiple times in the DOM, those can be found in `mediaplus-2017/assets/images/sprite.svg` and are accessed via `<use>` tags.