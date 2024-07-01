FROM cypress/browsers:node-18.14.1-chrome-110.0.5481.96-1-ff-109.0-edge-110.0.1587.41-1

WORKDIR /e2e

COPY cypress.config.js .
COPY package.json ./
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT ["npx", "cypress", "run"]
