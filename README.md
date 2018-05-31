# Description
A web application that displays a map and features loaded from the SQLite database (features.db). Polygons can be selected with a mouse click (SHIFT to select multiple). The UI has two buttons to perform operations on selected polygons: union and intersect. Changes are persisted to the SQLite database via the REST API which allows to list, save and delete polygons. The map tiles are loaded from Open Street Map's public map server and OpenLayers is used to render the tiles and provide map interactions. The backend server is implemented using Node.js, it serves both the static index.html file and the REST API.

Couple of notes:
- The UI is created using React (didn't have time to take Redux into use to manage state, but that's what I would normally do, I would also use stateless React components).
- Persisting changes to the backend is done with individual REST API calls to POST and DELETE features. This would have to be done in one transaction because if one of those calls fails we have a corrupt state in the database.
- Node.js is something I haven't used before but I thought I'd try it out just to get some experience with it.
- React, OpenLayers and Open Street Map data is something that I've used before.
- Tests: I would normally create UI tests (Jasmine or some other framework), unit tests for server side code and tests for the REST API (I usually use the rest-assured library for that).
# Prerequisites
- Install node.js

# Build
```
cd app/
npm install
npm install -g browserify
browserify -t [ babelify --presets [ react ] ] src/client.js -o src/public/bundle.js'
```

# Run
```
cd app/
cp ../features.db .
node src/server.js
Go to http://localhost:3000/index.html (REST API URL is http://localhost:3000/api/v1/features)
```
