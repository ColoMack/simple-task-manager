# Use an official Node.js runtime as the base image
FROM node:18

# set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependancies
COPY package*.json ./

# Install dependancies
RUN npm install

# Copy the rest of the app files into the container
COPY . .

# Build the app for production
RUN npm run build

# Use a lightwight web server to serve the static files
FROM nginx:stable-alpine

# Copy build files to nginx html directory
COPY build /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for serving the app
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]