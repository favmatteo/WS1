FROM node:16

WORKDIR /WS1

COPY package*.json ./

RUN npm ci --omit=dev
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

EXPOSE 3980

CMD [ "node", "index.js" ]