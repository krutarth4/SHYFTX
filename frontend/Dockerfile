FROM node:20.14.0 as BUILD
WORKDIR /project
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 4200
CMD ["npm", "start"]
