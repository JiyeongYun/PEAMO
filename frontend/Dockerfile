FROM node:14

WORKDIR /usr/src/app

ENV REACT_APP_REST_API_KEY 112b52a3500fcf54baac18976074af45

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]