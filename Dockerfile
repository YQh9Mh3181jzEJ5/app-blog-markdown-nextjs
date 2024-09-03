FROM node:20

WORKDIR /home/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn global add firebase-tools