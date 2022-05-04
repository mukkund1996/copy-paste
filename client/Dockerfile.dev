# Base image
FROM node:latest
# Working directory
WORKDIR /app

# Adding `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copying npm and src files
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

# Installing dependencies
RUN npm install -g npm@8.6.0
RUN npm install --silent

# Run the node application
CMD ["npm", "run", "start"]