FROM node:12

# Create app directory
WORKDIR /usr/src/app/render_server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "server/render_server.js"]