FROM  node:20-alpine3.17

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

COPY .env .

RUN npm run build

EXPOSE 5000

CMD ["yarn", "start:prod"]