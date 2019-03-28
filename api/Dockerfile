FROM node:latest

ENV SENDGRID_API_KEY ""
ENV DEBUG "*"

RUN mkdir /code
WORKDIR /code

COPY package.json /code/
RUN npm install

RUN mkdir /code/src
COPY ./src /code/src

CMD ["npm", "start"]