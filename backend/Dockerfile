FROM node:20

WORKDIR /app

COPY package.json .

RUN yarn

RUN yarn prisma init

COPY . .

COPY .env .

RUN yarn prisma migrate deploy

RUN npm run build

EXPOSE 5000

CMD ["yarn", "start"]