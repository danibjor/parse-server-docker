#FROM node:latest
FROM node:16.14.2

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install

ENV DATABASE_URI set_your_database_uri
ENV CACHE_REDIS_URI set_your_redis_cache_uri

ENV APP_ID set_your_application_id
ENV MASTER_KEY set_your_master_key

ENV SERVER_URL set_your_server_url_remember_https_if_needed
ENV CLOUD_CODE_MAIN set_your_cloud_code_index_file

ENV LIVE_QUERY_CLASSES comma_separated_list_of_classers_for_live_data
ENV LIVE_QUERY_REDIS_URI set_your_redis_cache_uri_for_live_queries

ENV PORT 1337
ENV MOUNT /parse

# Optional (default : 'parse/cloud/main.js')
# ENV CLOUD_CODE_MAIN cloudCodePath

# Optional (default : '/parse')
# ENV PARSE_MOUNT mountPath

EXPOSE 1337

# Uncomment if you want to access cloud code outside of your container
# A main.js file must be present, if not Parse will not start

# VOLUME /parse/cloud               

CMD [ "npm", "start" ]
