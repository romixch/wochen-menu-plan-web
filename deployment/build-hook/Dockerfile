FROM node:16 AS builder
COPY ./build-hook-server.js /build-hook-server
WORKDIR /build-hook-server
VOLUME ["/build-hook-server/build-hook"]

ENTRYPOINT ["node", "/build-hook-server/server.js"]
