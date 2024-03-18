FROM  node:20-alpine3.17

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

COPY .env .

RUN npm run build

RUN yarn prisma migrate deploy

EXPOSE 5000

CMD ["yarn", "start"]