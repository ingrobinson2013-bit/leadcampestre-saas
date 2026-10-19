# LeadCampestre OS v4 — Multi-Tenant PropTech SaaS & 10-Stage Kanban CRM + AI Auto-Tagger
FROM node:20-alpine

WORKDIR /app

# Copy application code, public drone assets, and storage directory
COPY local-server.mjs ./local-server.mjs
COPY public ./public
COPY storage ./storage
COPY app ./app
COPY database ./database
COPY routes ./routes
COPY ai_service ./ai_service

RUN mkdir -p /app/storage && chmod -R 777 /app/storage

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80

EXPOSE 80

CMD ["node", "local-server.mjs"]
