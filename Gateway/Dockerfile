FROM node:14.4-alpine3.11 as build
WORKDIR /app
COPY package*.json ./
RUN npminstall

FROM node:14.4-alpine3.11
COPY --from=build /app /

ENV HOST: 0.0.0.0
ENV PORT: 3001
ENV ACESS_TOKEN_SECRET: charutin_fi_di_narutin

COPY .  .
EXPOSE 3001
CMD ["node","server.js"]