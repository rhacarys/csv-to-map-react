# Cyan Challenge - CSV to Map React App

This is a simple React App used to upload files from an AWS Bucket to the [CSV to Map API](https://github.com/rhacarys/csv-to-map-api).
The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### The app is running on [`https://csv-to-map.netlify.app/`](https://csv-to-map.netlify.app/)

## Uploading a file

Once this app is running an open in a browser, you can insert a file url in the textfield located in the site header. Then, you can click in the Send button do send the file for upload.

The file provided must be in CSV format, with two columns (latitude and longitude) separated by coma.
Each line of the file must represent a single bidimensional Cartesian point.
These points will be parsed into a database and drawn as Markers on a big Mapbox Map.

## History

Click in the history button to access uploads history. If you select a file in the list, the current Markers of the map will be removed and the points previous parsed from this file will retake their places on the map.

Click in the Close button to hide the history panel and show back the url upload form.

---

## Installing and running

To clone the repository:

```bash
$ git clone https://github.com/rhacarys/csv-to-map-react.git
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
