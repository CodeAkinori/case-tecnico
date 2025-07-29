FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copia os arquivos do backend
COPY . .

# Rodar build do Maven (assumindo que você tem o wrapper mvnw no backend)
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

# Executa o JAR gerado pelo Maven (ajustar para nome do jar correto)
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
