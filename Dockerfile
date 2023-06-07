FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 5000
EXPOSE 5000
CMD ["node", "app.js"]