# frontend/Dockerfile

# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /usr/src/app

# package.json kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Restlichen Quellcode kopieren
COPY . .

# Angular-Anwendung für die Produktion bauen
RUN npm run build

# ---- Stage 2: Production ----
FROM nginx:stable-alpine

# Arbeitsverzeichnis für Nginx
COPY --from=builder /usr/src/app/dist/frontend-app/browser /usr/share/nginx/html

# Nginx-Konfiguration kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf
