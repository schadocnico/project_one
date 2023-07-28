FROM node:18

WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
CMD npm start