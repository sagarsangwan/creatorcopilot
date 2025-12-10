# /monorepo-root/frontend/Dockerfile - Simplified for Dev

# Use the base Node image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
# This is still needed for local volumes to work correctly
COPY package.json package-lock.json ./
RUN npm install

# Copy all application files (Your actual code)
COPY . .

# Expose the default port
EXPOSE 3000

# Command to run the Next.js development server
CMD ["npm", "run", "dev"]