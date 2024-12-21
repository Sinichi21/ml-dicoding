# Gunakan Node.js sebagai base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke container
COPY . .

# Ekspos port aplikasi
EXPOSE 8080

# Jalankan aplikasi
CMD ["npm", "start"]
