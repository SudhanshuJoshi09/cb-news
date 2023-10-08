FROM node:latest

LABEL maintainer="Sudhanshu Joshi <sudhanshujoshi49@gmail.com>"
LABEL description="CB News API Docker Image"
LABEL version="1.0"

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8081
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

CMD ["./wait-for-it.sh", "redis-stack:6379", "--", "npm", "start"]