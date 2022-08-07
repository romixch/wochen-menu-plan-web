FROM node:16
RUN mkdir /build-hook-server
COPY ./server.js /build-hook-server
WORKDIR /build-hook-server
VOLUME ["/build-hook-server/build-hook"]

ENTRYPOINT ["node", "/build-hook-server/server.js"]
