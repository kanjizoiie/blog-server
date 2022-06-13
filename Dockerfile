# build environment
FROM node:16.13.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# COPY Manifest files.
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./

# Run install.
RUN npm ci

# Copy files into container
COPY . ./

# Run build
RUN npm run build

# Export file
EXPOSE 8080

# Setup run command.
CMD [ "node", "dist/index.js" ]