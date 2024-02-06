FROM node:18.3.0

RUN apt-get update && apt-get install -y awscli jq

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 80
EXPOSE 81

# start with entrypoint.sh
CMD ["sh", "entrypoint.sh"]
