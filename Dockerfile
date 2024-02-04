FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 80
EXPOSE 81

# start with entrypoint.sh
CMD ["sh", "./init/entrypoint.sh"]