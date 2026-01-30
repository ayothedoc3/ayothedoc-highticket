FROM node:22-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN pnpm build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]
