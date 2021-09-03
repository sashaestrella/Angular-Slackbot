FROM node:12.14.0
EXPOSE 4200/tcp

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install

COPY . /app

CMD ng serve --host 0.0.0.0 --disable-host-check
