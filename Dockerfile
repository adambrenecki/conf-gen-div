FROM ubuntu
MAINTAINER Andy Marks
RUN apt-get update
RUN apt-get install -y nodejs  
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y npm