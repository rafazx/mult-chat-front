FROM node
WORKDIR /usr/front
COPY package*json ./
RUN yarn install
COPY . .
CMD ["yarn", "start"]