FROM node:14

# Create working directory
WORKDIR /usr/src/app

# Install dependancies
COPY package*.json ./

RUN npm install

COPY . .

# Allow access to port 3000
EXPOSE 3000

CMD ["npm", "start"]
