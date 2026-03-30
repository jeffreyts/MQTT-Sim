# Unified Dockerfile: Build React frontend, copy to Spring Boot backend, build JAR, run

# 1. Build frontend
FROM node:20-alpine as frontend-build
WORKDIR /app
COPY mqtt-sim-client ./mqtt-sim-client
WORKDIR /app/mqtt-sim-client
RUN npm install && npm run build

# 2. Build backend, copy frontend build into static resources, then build JAR
FROM eclipse-temurin:21-jdk as backend-build
WORKDIR /app
COPY . /app
COPY --from=frontend-build /app/mqtt-sim-client/dist /app/mqtt-sim-server/src/main/resources/static
WORKDIR /app/mqtt-sim-server
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# 3. Minimal runtime image
FROM eclipse-temurin:21-jre as runtime
WORKDIR /app
COPY --from=backend-build /app/mqtt-sim-server/target/*.jar /app/mqtt-sim-server.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/mqtt-sim-server.jar"]
