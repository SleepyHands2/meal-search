// GitHub Pages SPA fallback: Pages serves 404.html for unknown paths, so a copy
// of index.html lets deep links (e.g. /meal-search/by-name/pizza) boot the app
// and hand routing to Vue Router.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.log('Copied dist/index.html -> dist/404.html')
