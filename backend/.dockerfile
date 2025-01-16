# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies

# Set working directory
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm install --production

# Stage 2: Copy application code
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies from the previous stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Expose backend port
EXPOSE 3000

# Command to start the backend server
CMD ["npm", "start"]
