FROM node:12

WORKDIR /cuponzim

COPY . /cuponzim
COPY package.json /cuponzim
COPY yarn.lock /cuponzim

RUN npm install 

EXPOSE 3333

CMD ["npm" "run" "dev"]