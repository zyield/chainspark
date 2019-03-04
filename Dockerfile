FROM node:9.10.0-alpine as build-deps

ENV REACT_APP_BASE_URL=https://api.chainspark.io
ENV REACT_APP_SOCKET_URL=wss://api.chainspark.io/api/socket
ENV REACT_APP_API_SECRET=0x2728b8bAcb130F6C98EeB9d43ff3FbF98E965A06

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 4001

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
