**Under Active Development**

# MQTT-Sim

MQTT-Sim is a simulator designed to periodically publish data to an MQTT broker, simulating multiple publishers and topics. It is useful for testing and developing MQTT-based systems by generating configurable, realistic MQTT traffic.

## Features

- **Simulate Multiple Topics:** Define multiple topics, each with its own value range, interval, and QoS.
- **Periodic Publishing:** Each topic publishes random values at a configurable interval.
- **Broker Management:** Connect to/disconnect from any MQTT broker (supports MQTT 3 and 5).
- **Web UI:** Modern React-based frontend for managing brokers and topics.
- **REST API:** Spring Boot backend exposes endpoints for broker and topic management.
- **Configurable QoS:** Choose the MQTT Quality of Service level for each topic.
- **Light/Dark Theme:** Switchable UI themes.

## Architecture

- **Frontend:** React + TypeScript + Vite (located in `mqtt-sim-client/`)
- **Backend:** Java Spring Boot (located in `mqtt-sim-server/`)

## Getting Started

### Prerequisites

- Node.js (for the frontend)
- Java 21+ and Maven (for the backend)

### Running the Backend

```sh
cd mqtt-sim-server
./mvnw spring-boot:run
```

The backend will start on port 8080.

### Running the Frontend

```sh
cd mqtt-sim-client
npm install
npm run dev
```

The frontend will start on port 3000.

### Usage

1. Open the frontend at [http://localhost:3000](http://localhost:3000).
2. Enter your MQTT broker URL and connect.
3. Add topics, set their value ranges, intervals, and QoS.
4. The simulator will begin publishing random values to the broker as configured.

## License

MIT License
