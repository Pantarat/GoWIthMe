FROM node:16-alpine3.17

WORKDIR /app

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]