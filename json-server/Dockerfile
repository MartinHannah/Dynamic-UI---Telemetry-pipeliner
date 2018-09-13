FROM node:alpine

RUN npm install -g json-server

WORKDIR /data
VOLUME /data

EXPOSE 80
ADD run.sh /run.sh
ENTRYPOINT ["ash", "/run.sh", "-H", "0.0.0.0","-p","80","/data/db.json"]
CMD []
