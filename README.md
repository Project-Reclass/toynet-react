# [![Mattermost](docs/PR-Logo-Long-FullColor.png)](https://mattermost.org)

Check out your new networking buddy [https://www.toynet.projectreclass.org](https://www.toynet.projectreclass.org)

Project Reclass is a multi-disciplinary nonprofit organization that teaches technical skills to incarcerated veterans. Learn more at [projectreclass.org](https://projectreclass.org).

[![Splash Screen](docs/splashscreen.png)](https://toynet.projectreclass.org)

## Get Involved

* [Get Involved](https://www.projectreclass.org/get-involved/)
* [Contribute Code](https://docs.projectreclass.org/toynet/contributing-code-to-toynet/contributing-code-to-toynet)
* [See "Help Wanted" Tickets](https://github.com/Project-Reclass/toynet-react/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
* [Check out some of out other projects](https://github.com/orgs/Project-Reclass/repositories)

## Getting Started with Development

The easiest way to get started with development is with [GitPod](https://www.gitpod.io/), however, you can also get started on your local development machine if you have nodejs installed.

1. Sign up for [GitPod](https://www.gitpod.io/) using GitHub Account.
2. Click New Workspace and enter: https://github.com/Project-Reclass/toynet-react.
3. Once project is open, navigate to the TERMINAL tab at the bottom of the IDE.
4. Alter package.json#L91 to say "proxy": "http://localhost:8080".
5. Cancel the currently running npm instance by hitting ctrl-c or command-c.
6. Run export DANGEROUSLY_DISABLE_HOST_CHECK=true.
7. Run `npm run start`
8. Click Open Browser in the popup indicating A service is available on port 3000.
9. If the popup does not load:  
  a. navigate to the `PORTS` tabs right   
  b. click on the Address column for Port 3000  
  c. click Open Browser  

## Getting Started

The easiest way to get ToyNet up and running is by using the docker-compose. This requires [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/), and [git](https://git-scm.com/downloads) to be installed. Our `docker-compose.yml` file will start each service necessary for using ToyNet on your machine in a production setup.

To get started, first download the [`docker-compose.yml`](https://git-scm.com/downloads) file.

For Linux with `wget`

```bash
wget https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml
```

For Windows with Powershell

```
wget https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml -Outfile docker-compose.yml
# or
Invoke-WebRequest https://raw.githubusercontent.com/Project-Reclass/toynet-react/master/docker-compose.yml -Outfile docker-compose.yml
```

Then to start each ToyNet
```bash
docker-compose up --build -d # use -d to run in the background
```

## License

See the [LICENSE file](LICENSE) for mor information.

## Follow Us

* [Twitter](https://twitter.com/ProjectReclass)
* [Facebook](https://www.facebook.com/projectreclass)
* [LinkedIn](https://www.linkedin.com/company/reclass/)
* [Blog](https://www.projectreclass.org/digest/)

## Contributing

Check out our [CONTRIBUTING guide](CONTRIBUTING.md)!



