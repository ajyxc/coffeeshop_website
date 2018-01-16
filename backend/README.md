# Comprio API Server

## Dependencies

[Docker](https://docs.docker.com/engine/installation/) :whale: & [docker-compose](https://docs.docker.com/compose/install/).

**Note:** Node.js v6.3+ is required, but only on the machine running this, so Docker will take care of that for you.

## Developing

Run locally using docker-compose:

```bash
docker-compose up
```

The app runs on [localhost:8080](http://localhost:8080).

If the docker container has been built previously then it will not be re-built so you may need to use the following command to ensure that you have a clean image.

```bash
docker-compose up --build
```

The node instance running inside the container should restart on the save of `index.js` regardless so most changes don't require a restart/rebuild of the container itself.

## Production

Build the Docker :whale: container and run it:

_You'll likely be consuming Postgres as a service, so make sure you set the env var to connect to it._

```bash
sudo docker build -t <image-name> .
sudo docker run \
  -p <host-port>:8080 \
  -d <image-name> \
  -e PGHOST=host \
  -e PGPORT=5432 \
  -e PGUSER=comprio \
  -e PGDATABASE=comprio \
  -e PGPASSWORD=secret \
  -e PGSSLMODE=require \
  -e PGPOOLMAX=10 \
  -e PGPOOLMIN=4 \
  -e PGPOOLIDLE=10000 \
  npm run start
```



--------------------------------------------------------------------------------
