# Prerequisites
- Install node.js

# Build
```cd app/
npm install
npm install -g browserify
browserify -t [ babelify --presets [ react ] ] src/client.js -o src/public/bundle.js'
```

# Run
```cd app/
cp -force ../features.db .
node src/server.js
Go to http://localhost:3000 (REST API URL is http://localhost:3000/api/v1/features)
```
