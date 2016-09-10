FROM node:4.2.6

ADD package.json /tmp/package.json
RUN cd /tmp && npm install && npm install -g gulp && npm install node-sass
RUN mkdir -p /app && cp -a /tmp/node_modules /app
ADD . /app

WORKDIR /app
EXPOSE 3000
CMD ["npm", "start"]
