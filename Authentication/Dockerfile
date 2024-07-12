# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy wait-for-it.sh script
COPY wait-for-it.sh .

# Make wait-for-it.sh executable
RUN chmod +x wait-for-it.sh

# Copy entry point script
COPY entrypoint.sh .

# Make entry point script executable
RUN chmod +x entrypoint.sh

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the application
CMD ["./entrypoint.sh"]
