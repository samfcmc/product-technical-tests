# Trouva challenge

The goal of this challenge is to show the 5 nearby boutiques taking into account the user's current location.

## Run

In order to run this assignment, you need to meet the following requirements:

- [node](https://nodejs.org/en/)

- [Docker-compose](https://docs.docker.com/compose/install/)

After making sure you meet the requirements you need to run the backend and the frontend in the `web-app` folder.

### Run the backend

In the project's root, run the following command

```bash
docker-compose up
```

### Run the frontend

First, you need to be in the `web-app` folder

```bash
cd web-app
```

Then, you need to install all the dependencies

```bash
npm i
```

Finally, you can start the web app.

```bash
npm start
```

### Build for production

In order to have the `javascript` minified and everything ready for production, you need to run the `build` script

```bash
npm run build
```

This will create a `dist` folder with everything that can be served by any web server.

_What is missing_

If you try to serve this `dist` folder as it is, the API requests will not work, unless the API is running on the same domain and all the endpoints have the `/api` after the base url.

There are multiple solutions for this:

- Inject the base API url using an environment variable when creating a production build

- Having a server on the `web-app` folder that would handle this

## Tests

There are some simple tests setup. This is far from full coverage but everything is setup in a way that makes it easier to add more tests in the future, including the coverage report after the tests run.

To run the tests, you simply need to run the `test` npm script

```bash
npm test
```

The following libraries were used to be able to do tests:

- [Jest](https://jestjs.io/): The test runner

- [React testing library](https://testing-library.com/docs/react-testing-library/intro/): Allows to render components in tests

- [Babel-jest](https://www.npmjs.com/package/babel-jest): Allows to compile Javascript test files using babel. This is needed to be able to handle JSX syntax, such as React components

- jest-environment-jsdom: Tests run in a `node` environment. However, when doing tests on the frontend, we need the `window` and the `document` object, so the components can be rendered somewhere. This package provides an environment that have such features, so the components can be rendered and it is possible to do assertions on the result

- [@testing-library/js-dom](https://www.npmjs.com/package/@testing-library/jest-dom): Provides a set of custom matchers that allow to do assertions about the DOM (for instance, if an element is visible)

## Solution

The frontend was done in [React](https://reactjs.org/) v18.
Other libraries were used such as [Redux](https://redux.js.org/) to manage the application's state.

### Structure

The `web-app` folder has the following structure:

- `src` directory, which contains all the source code for the web app (components, index html file, etc)

Inside the `src` folder we have the following ones:

- `components`: All the React components that are rendered in the browser.

- `hooks`: Set of custom hooks to avoid repeated tasks in components

- `selectors`: Set of functions to select parts of the `Redux` state. More on that in the [State management section](#state-management)

- `services`: Functions that define a slice of the `Redux` state that depends on data fetched from the REST API

- `slices`: Definition of some slices of `Redux` state

- `style`: Includes global variables and mixins used in several styling files

### State management

`Redux` is the library being used to manage the application's state, such as the list of nearby boutiques and the current user's location.

### Getting the user location

Before getting the nearby boutiques, we need to know the current user's location.

The [GeoLocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) is used to get the user's location from the browser.

There is a hook `useGeolocation` that creates an abstraction on top of the `GeoLocation API` to avoid doing all the work, such as watching for location changes, in the component. This way, if there is any other component that needs this data, this hook can be used.

This hook returns an object with the following properties:

- `coordinates`: Object with the `latitude` and `longitude` values

- `error`: The error, if there is any, that happened when trying to get the location. This can happen, for instance, if the user didn't allow the browser to get the current location

- `locating`: A flag that is `true` while the browser is trying to get the current location

- `hasPosition`: A flag that is `true` if there is already a location available and `false` otherwise

- `getPosition`: A function that can be called to force getting the current location. Can be useful, for instance, if the user didn't give permission for the location and we want to allow them to change the browser settings and try again.

### Getting the nearby boutiques

After we have the current user's location available, it is possible to get all the nearby boutiques.

Ideally, there would be an endpoint that would accept the user's coordinates (latitude and longitude) as query parameters and query the database for the boutiques that are nearby. Such endpoint was not implemented and any backend work was outside of the scope of this challenge. The solution would need to do this computation on the client. However, there was an endpoint to get all the available boutiques.

The implemented solution does the following steps:

- Get the browser's current location and put the coordinates in the `Redux` state

- Make an API request to get all the boutiques and puts that array in the `Redux` state

- Compute the nearby boutiques in a selector that uses the data from two selectors, the one that holds all the boutiques and the other that holds the current user's location coordinates

### Tooling

- [`Parcel`](https://parceljs.org/) is used to run the frontend locally and to build it for production. This was the tool picked because it requires no configuration and all the tools are selected and installed automatically as soon as there are files that needs those tools. For instance, if we create some React components, this tool will handle the JSX syntax without any configuration. Of course, any other tool could be used, such as [webpack](https://webpack.js.org/) but it requires some setup

- [Sass](https://sass-lang.com/) is used to write styling rules instead of using pure CSS. Tools like sass have really good benefits, such as, mixins and variables that avoids a lot of repetion in styling rules. The main disadvantage is that it requires another tool to handle these files and turn those into CSS, because browser cannot handle sass files. However, since we ware using `Parcel`, as soon as we have our first `scss` file, it automatically downloads the `@parcel/transformer-sass` library to handle compiling sass into CSS.

## Conclusion

I enjoyed doing this challenge. Never worked with the Geolocation API before, I got the chance of learning something new.

I hope you like it :)
