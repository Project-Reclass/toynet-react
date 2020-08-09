Heroku Automated deployment of master: https://toynet-react.herokuapp.com/

Changes made in package.json related to the Heroku deployment (specifically the creation of `server.js`) have made it so that `npm start` no longer brings up the react development server. To run the React development server, run `npm run dev` or `npm run-script dev`.

-------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting Started

<!-- toc -->
- [Running in Development](#running-in-development)
- [Testing PRs](#testing-pull-requests-with-docker-compose)
- [Testing Master](#testing-the-master-branch)
- [Available Scripts](#available-scripts)
- [Learn More](#learn-more)
<!-- tocstop -->

-------------------------------------------

Because `toynet` uses multiple services, `docker-compose` was introduced to help start each services and connect them on local machines.

## Running in Development

Because there are two parts to `toynet` there is a docker-compose that is useful to get started developing as a fast as possible.

To start

```bash
$ git clone https://github.com/Project-Reclass/toynet-react.git
$ cd toynet-react
```

The docker-compose file can then be ran in the background using

```bash
$ docker-compose -f docker-compose.dev.yml up -d --build
```

After the docker-compose starts up you can start `toynet-react` for development using
```bash
$ npm run dev
```

and navate to http://localhost:3000.

## Testing Pull Requests with Docker Compose

Testing pull requests can be done without cloning down or checking out the pull request on the local machine. Because `toynet-react` uses docker-compose pull-requests can be preview by just using the docker-compose file.

```bash
$ wget https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml
```

Edit the `docker-compose.yml` file to include the GitHub PR id.
```yml
services:
  ...
  frontend:
    build: https://github.com/Project-Reclass/toynet-react.git#pull/{pull-request-number}/head
    # e.g. https://github.com/Project-Reclass/toynet-react.git#pull/14/head
```

And then run
```bash
$ docker-compose up --build
```

The PR app can then be previewed at http://localhost:3000

## Testing the Master Branch

The master or default branch can be tested in much the same way that PR previews can be tested.

```bash
$ wget https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml
```

Edit the `docker-compose.yml` file use master or the default branch instead of a PR id.
```yml
services:
  ...
  frontend:
    build: https://github.com/Project-Reclass/toynet-react.git#master
    # e.g. instead of https://github.com/Project-Reclass/toynet-react.git#pull/14/head
```

And then run
```bash
$ docker-compose up --build
```

The app can then be accessed at http://localhost:3000.

## Available Scripts

In the project directory, you can run:
* `npm run dev` - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.
* `npm start` - Runs the app from build. Open [http://localhost:8080](http://localhost:8080) to view it in the browser. You will also see any lint errors in the console.
* `npm test` - Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
* `npm run build` - Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/).

### Contributors

* Sammy Tran
* Yi Yang
