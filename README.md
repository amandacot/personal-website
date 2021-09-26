# personal-website
"build": "npm run css",
"css-compile": "node-sass --include-path node_modules --output-style compressed --source-map true --source-map-contents true --precision 6 scss -o assets/css/",
"css-lint": "stylelint scss/",
"css-prefix": "postcss --replace assets/css/starter.css --use autoprefixer --map",
"css-purge": "purgecss --keyframes --css assets/css/starter.css --content index.html \"node_modules/bootstrap/js/dist/{util,modal}.js\" --output assets/css/",
"css": "npm-run-all css-compile css-prefix",
"server": "serve --listen 3000",
"start": "npm-run-all --parallel watch server",
"watch": "nodemon -e html,scss -x \"npm run css\"",
"test": "npm run css-lint && npm run css"
