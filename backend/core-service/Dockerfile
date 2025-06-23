# backend/core-service/Dockerfile

# ---- Stage 1: Build ----
# Basis-Image mit Node.js und allen Werkzeugen zum Bauen
FROM node:20-alpine AS builder

# Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Nur package.json kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Restlichen Quellcode kopieren
COPY . .

# Anwendung bauen
RUN npm run build

# ---- Stage 2: Production ----
# Neues, minimales Image
FROM node:20-alpine

WORKDIR /usr/src/app

# Nur Notwendiges aus Stage 1 kopieren
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

# Start-Befehl
CMD ["node", "dist/main"]