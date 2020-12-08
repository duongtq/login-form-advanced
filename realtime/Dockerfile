FROM node:12

# Create app directory
WORKDIR /usr/src/app/realtime

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "server/realtime_server.js"]