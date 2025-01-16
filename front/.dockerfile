# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the application
FROM nginx:stable-alpine

# Copy build artifacts from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start the server
CMD ["nginx", "-g", "daemon off;"]
