FROM node:22

WORKDIR /app

# Install deps
COPY frontend/package*.json ./
RUN npm install

# Copy app code (overridden by volume in dev)
COPY frontend ./

ENV HOST=0.0.0.0
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
