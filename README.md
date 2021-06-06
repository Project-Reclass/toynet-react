# ToyNet - Virtual Network Emulator In Your Browser

Check out your new networking buddy [https://www.toynet.projectreclass.org](https://www.toynet.projectreclass.org)

## Getting Started

<!-- toc -->
- [Running in Development](#running-in-development)
- [Testing PRs](#testing-pull-requests-with-docker-compose)
- [Testing Master](#testing-the-master-branch)
- [Available Scripts](#available-scripts)
- [Recommended IDE Plugins](#ide-plugins)
- [Learn More](#learn-more)
<!-- tocstop -->

-------------------------------------------

Because `toynet` uses multiple services, `docker-compose` was introduced to help start each services and connect them on local machines. Docker compose port maps each service running (e.g. frontend and backend).
The frontend application when used in a docker container normally runs on port 80, however, docker-compose maps port 3000 of the local machine to port 80 on the container. For the backend, it normally exposes port 8000
in the container, because port 8000 is not a system port, the docker-compose just maps port 8000 to port 8000 on the local machine.

This port mapping is represented in the docker-compose as

```yml
services:
  backend:
    ...
    ports:
      - "8000:8000"
# or
  frontend:
    ...
    ports:
      - "3000:80"
```

backend -> 8000  
frontend -> 3000

## Dependencies

The below software is required in order to get setup to run `toynet-react`.

- Git [(Install Guide)](https://git-scm.com/downloads)
- Docker [(Install Guide)](https://docs.docker.com/engine/install/)
- Docker-Compose [(Install Guide)](https://docs.docker.com/compose/install/)
- Node.js and NPM [(Install Guide)](https://nodejs.org/en/)

## Running in Development

Because there are two parts to `toynet` there is a docker-compose that is useful to get started developing as a fast as possible.

To start

```bash
$ git clone https://github.com/Project-Reclass/toynet-react.git
$ cd toynet-react
```

The docker-compose file can then be run in the background using

```bash
$ docker-compose -f docker-compose.dev.yml up -d --build
```

Before starting the frontend of `toynet` you will need to install all the dependencies. This can be done using

```bash
$ npm i
```

After the docker-compose starts up you can start `toynet-react` for development using

```bash
$ npm start
```

and navate to http://localhost:3000.

## Testing Pull Requests with Docker Compose

Testing pull requests can be done without cloning down or checking out the pull request on the local machine. Because `toynet-react` uses docker-compose pull-requests can be previewed by just using the docker-compose file.

For Linux run

```bash
$ wget https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml
```

On Windows (Powershell) run

```powershell
$ wget https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml -Outfile docker-compose.yml
# or
$ Invoke-WebRequest https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml -Outfile docker-compose.yml
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

The app can then be accessed at [http://localhost:3000](http://localhost:3000).

## IDE Plugins

Some plugins that you might find helpful are

- ESLint
- React
- VSCode Styled Components

## Available Scripts

In the project directory, you can run:

- `npm run start` - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.
- `npm test` - Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
- `npm run style:fix` - Fixes any automatically fixable ESLint errors.
- `npm run style:check` - Checks and displays any ESLint errors.
- `npm run check-types` - Checks all typescript types to ensure correct typing.
- `npm run build` - Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/).

### Contributors

- Sammy Tran
- Yi Yang

<body>

</body>
