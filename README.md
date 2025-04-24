**Under Active Development**

# MQTT-Sim

MQTT-Sim is a simulator designed to periodically publish random numeric data to an MQTT broker to help simulate multiple sensor readings without physical devices.

# Simple To Use
- Connect to a broker
![image](https://github.com/user-attachments/assets/1abd7792-4270-45ad-8dd5-82ae04b626e3)
- Add and Configure Topics to publish to
![image](https://github.com/user-attachments/assets/bff7fafa-1794-4cb3-b31f-77062c849c2e)
- Press the play button to begin publishing, pause to stop publishing
- Toggle between dark and light mode
![image](https://github.com/user-attachments/assets/039add3b-a068-43d2-b673-0cec813e7adb)



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

## License

MIT License
