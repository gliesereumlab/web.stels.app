FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-slim

RUN npm install -g serve

WORKDIR /app

COPY --from=builder /app/build ./build

EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
