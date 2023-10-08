# CB News API Setup Guide

This guide provides step-by-step instructions for setting up the CB News API, a news API built on top of the GNews API. You can use this API to fetch news results based on title, author, and keywords.

## Prerequisites

Before setting up the CB News API, make sure you have the following prerequisites in place:

- **Node.js and npm**: Ensure that you have Node.js and npm installed on your system.

  - **Windows**: Download and install the latest version of Node.js from the [official website](https://nodejs.org/).

  - **Linux**: Open a terminal window and run the following command to install npm:
    ```
    sudo apt install npm
    ```

  - **macOS**: Open a terminal window and run the following command to install npm:
    ```
    brew install npm
    ```

- **Redis Database Server**: Set up a Redis database server by following these steps:

  1. Download and install the latest version of Redis from the [official website](https://redis.io/).

  2. Start the Redis server by running the following command:
     ```
     redis-server
     ```
     By default, the Redis server will listen on port 6379. You can change this by editing the `redis.conf` file.

## Configuration

### Environment Variables

Create a `.env` file in the root directory of your project and populate it with the following environment variables:

```env
PORT=
REDIS_HOST=
REDIS_PORT=
REDIS_USER=
REDIS_PASS=
CACHE_TIMEOUT=
API_KEY=
```

# CB News API Setup and Usage

To set up and start the CB News API, follow these steps:

1. Install all Node.js packages by running the following command in your project directory:

   ```bash
   npm install
   ```
2. To start the server you can use the following commands.
    ```bash
    npm run dev
    ```
    ```bash
    node server.js
    ```

## API Collections

The Postman collection for the API is located in the root directory of the project, named `CBNews-Collection.json`. To import the collection into Postman, follow these steps:

1. Open Postman and click the "File" menu.

2. Select "Import" and then choose "Collection."

3. Navigate to the `CBNews-Collection.json` file and click "Open."

Once the collection is imported, you can start using the API by sending requests to the different endpoints.