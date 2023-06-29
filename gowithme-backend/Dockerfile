FROM node:16-alpine3.17

WORKDIR /app

COPY package.json .

RUN npm run build

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]