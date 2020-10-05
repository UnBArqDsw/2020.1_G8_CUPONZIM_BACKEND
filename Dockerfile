FROM node:12

WORKDIR /cuponzim

COPY . /cuponzim
COPY package.json /cuponzim
COPY yarn.lock /cuponzim

RUN yarn 

EXPOSE 3333

CMD ["yarn" "dev"]