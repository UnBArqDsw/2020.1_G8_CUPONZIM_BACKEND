FROM node:12

WORKDIR /cuponzim

COPY . /cuponzim
COPY package.json /cuponzim
COPY package-lock.json /cuponzim

RUN npm install 

EXPOSE 3333

CMD ["npm","run","dev"]