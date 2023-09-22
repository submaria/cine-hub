FROM node:14.17.3 AS build
WORKDIR /app
COPY package*.json /app/
RUN npm i -g @ionic/cli
RUN npm install
COPY ./ /app/
# RUN ionic build 
RUN ionic build --prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/