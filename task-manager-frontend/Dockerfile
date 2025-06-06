FROM node:18
ENV PORT 3000

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY dist ./dist

RUN npm install

# Copy app source and build it
COPY . .
RUN npm run build

# Install static file server
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]