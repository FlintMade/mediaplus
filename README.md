# mediaplussea.com

## Various notes

### Assets

* CSS and JS are loaded through enqueue functions in `functions.php`
* Most SVGs are accessed from sprite.svg in the assets folder via `<use>` tags. Styling the pieces of the "more info" arrows on hover was not working well with the sprite approach, so they have been embedded in the markup directly as includes.