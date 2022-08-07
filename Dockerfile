FROM node:16 AS builder
COPY . /builder/wochen-menu-plan-web
WORKDIR /builder/wochen-menu-plan-web
RUN npm ci
RUN CI=true npm test
RUN CI=true npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets over
COPY --from=builder ./builder/wochen-menu-plan-web/build ./
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
