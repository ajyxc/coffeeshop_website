FROM node:6

# # use changes to package.json to force Docker not to use the cache
# # when we change our application's nodejs dependencies:
# COPY package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
#
# # From here we load our application's code in, therefore the previous docker
# # "layer" thats been cached will be used if possible
# WORKDIR /opt/app
# COPY . /opt/app

ENV APP_HOME /opt/app/
ENV TEMP_NPM /tmp

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json $TEMP_NPM/package.json
RUN npm config set registry https://registry.npmjs.org/
RUN cd $TEMP_NPM && npm install --silent
RUN mkdir -p $APP_HOME && cp -a $TEMP_NPM/node_modules $APP_HOME/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR $APP_HOME
COPY . $APP_HOME

EXPOSE 8080

CMD [ "npm", "start" ]
