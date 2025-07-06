# MQTT-Sim

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-21%2B-blue)](https://www.oracle.com/java/technologies/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.4-green)](https://spring.io/projects/spring-boot)

MQTT-Sim is a powerful MQTT message simulator that enables you to create sophisticated IoT device simulations with customizable payloads and realistic data patterns. Perfect for testing and development of MQTT-based applications without requiring physical devices.

## Key Features

### Advanced Payload Generation
- **Template-based Payloads**: Create custom JSON payloads using a simple templating system
- **Randomize Data**: Randomize properties within the payload in a few different ways:
  - **String - Categorical**: A string will be selected from a comma-delimted list
  - **Number - Random**: Generate values within a specified range with custom precision
  - **Number - Normally Distributed**: Simulate normally distributed numeric data
  - **Boolean**: True/False randomization
  - **Timestamps**: Automatic timestamp generation with customizable formats

### Topic Management
- **Multiple Topics**: Define and manage multiple MQTT topics
- **Flexible Publishing**: Configure publishing intervals per topic
- **QoS Support**: Full support for MQTT Quality of Service levels (0-2)
- **Retain Flag**: Option to set the retain flag for each topic
- **Single Topic Publish**: Publish a single message to a topic
- **Auto Publish**: Automatically publish messages to a topic at a specified interval

### Other Features
- **Dark/Light Theme**: Easy on the eyes in any lighting condition

## Technical Stack

### Frontend
- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Bootstrap 5** with custom theming
- **Vite** for fast development and building

### Backend
- **Spring Boot 3.4.4**
- **H2 Database** (in-memory with file persistence)
- **HiveMQ MQTT Client**
- **Maven** for dependency management

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- Java 21+ (Temurin distribution recommended)
- Maven 3.6.3+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mqtt-sim.git
   cd MQTT-Sim
   ```

2. Start the backend server:
   ```bash
   cd mqtt-sim-server
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

3. In a new terminal, start the frontend:
   ```bash
   cd mqtt-sim-client
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Usage Guide

### 1. Connect to an MQTT Broker
   - Click "Add Broker" in the sidebar
   - Enter broker details (host, port, and credentials if required)
   - Click "Connect" to establish the connection

### 2. Create Topics
   - Click "Add Topic"
   - Configure the topic path and publishing options
   - Set the desired QoS level (0-2) and retain flag

### 3. Define Payload Structure
   - Use the Payload Editor to create your message template
   - Add properties with different data types
   - Configure each property's behavior (ranges, probabilities, etc.)
   - Use `{{propertyName}}` syntax in your template to insert values

### 4. Start Publishing
   - Toggle the play button to start/stop publishing
   - Monitor published messages in real-time
   - Adjust settings on the fly while publishing

## Building for Production

To create a production build:

```bash
# Build the frontend
cd mqtt-sim-client
npm run build

# Build the backend
cd ../mqtt-sim-server
./mvnw clean package
```

The production build will be available in the respective `target` and `dist` directories.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
