# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Icons

from https://uxwing.com/


# Deployment

This gets bit complicated. So we start with an overview:

At every commit on *main* GitHub is triggering a hook on https://app-build.wochenmenuplan.romix.ch/. This hits a docker server ([server.js](./deployment/build-hook/server.js)) which touches the file `deployment/build-hook/main`. This get's picked up by `run-pipeline.sh` that should be run as cron file on the server. It finds the new message and runs a `docker-compose build` and recreates the containers.

To get it running on a server I used following commands:

```
> git clone https://github.com/romixch/wochen-menu-plan-web.git
> cd wochen-menu-plan-web/
> crontab -e
# Add following line
*/5 * * * * cd wochen-menu-plan-web/deployment && ./run-pipeline.sh
```

The first time you need to touch the file `deployment/build-hook/main` yourself because there is no server yet to do it for you.

The next push to the repository should start the build pipeline.