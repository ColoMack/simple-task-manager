# Step 1: Use the official Node.js image
FROM node:20

# Step 2: Set the working directory in the container to `/usr/src/app`
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install the dependancies
RUN npm install

# Step 5: Install SQLite CLI
RUN apt-get update && apt-get install -y sqlite3

# Step 6: Copy the rest of the application into the container
COPY . .

# Step 7: Expose port 5000 for your application
EXPOSE 5000

# Step 8: Define the default command to run your application
CMD ["npm", "start"]