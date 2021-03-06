FROM node:7.10
LABEL maintainer="Grayson Gilmore (gilmoreg@live.com)"

RUN npm install forever -g

# Prevent npm install from running unless package.json changes
COPY ./package.json src/
# Prevent npm from rechecking cache on long installs and from cluttering CI log
RUN cd src && npm install --prefer-offline --silent

COPY . /src
WORKDIR src/

EXPOSE 80

CMD ["npm", "start"]