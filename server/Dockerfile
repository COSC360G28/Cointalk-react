FROM node:14

# Create working directory
WORKDIR /usr/src/app

# Install dependancies
COPY package*.json ./

RUN npm install

COPY . .

# Allow access to port 5000
EXPOSE 5000

CMD ["npm", "run", "dev"]

