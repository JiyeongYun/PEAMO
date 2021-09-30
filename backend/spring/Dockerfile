FROM openjdk:11
#COPY . /usr/src/myapp
#WORKDIR /usr/src/myapp
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
CMD ["java", "-jar", "/app.jar"]