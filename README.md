# postgres_kafka

This project is built using JavaScript with Node.js as the runtime environment. It integrates PostgreSQL as the database and Apache Kafka for message streaming. The system demonstrates a data pipeline where existing database records are read in batch, published to a Kafka topic, and consumed for processing.


# Environment/Tools

1. Backend language: JavaScript
2. Runtime environment: Node.js
3. Version control: GitHub
4. Database: PostgreSQL
5. Message broker: Apache Kafka (Cloud-hosted)

# Prerequisites

1. Clone the repository to your local system
2. Create `.env` file to store database and Kafka configuration
3. Create `/certs` folder for SSL certificates and keys
4. Add both `.env` and `/certs` to `.gitignore` file

## .env Configuration

```
DB_HOST=<postgresql-host>
DB_PORT=<db-port>
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME=<database-name>
DB_SSL=certs/ca.pem
KAFKA_CA=certs/kafka-ca.pem
KAFKA_BROKER=<kafka-broker-endpoint>
```

# Components

1. **db.js** - Establishes a connection to the PostgreSQL database using the `pg` module
2. **insert.js** - Inserts data into PostgreSQL database tables and creates tables if they don't exist
3. **producer.js** - Reads all existing data from the database and publishes it to a Kafka topic
4. **consumer.js** - Subscribes to the Kafka topic and processes incoming messages in real-time

# Database Setup and Testing

Using the psql command-line interface (CLI):

```bash
psql -h <postgresql-host> -p <port> -U <username> -d <database>
```

## Verification Commands

1. List all databases:
   ```sql
   \l
   ```

2. List all tables:
   ```sql
   \dt
   ```

## Sample Database Content

```sql
myDatabase=> \dt
         List of relations
 Schema | Name  | Type  |  Owner   
--------+-------+-------+----------
 public | test5 | table | dbadmin
(1 row)

myDatabase=> SELECT * FROM test5;
 id | name  |       email       
----+-------+-------------------
 88 | test2 | test2@example.com
 89 | test3 | test3@example.com
 90 | test4 | test4@example.com
 87 | test1 | test1@example.com
(4 rows)
```


---

# Implementation Details

## PostgreSQL Connection

The `db.js` script establishes connection to PostgreSQL using the `pg` library. Environment variables from `.env` file are managed by `dotenv` to avoid hardcoding sensitive information.

- Uses separate database `myDatabase` instead of `defaultdb`
- `.env` file is in `.gitignore` for security

**Usage:**
```bash
node db.js
# or
nodemon db.js
```

## Kafka Integration

The project connects to Kafka using the `node-rdkafka` library.

### Producer (`producer.js`)

- Connects to Kafka broker using SSL authentication
- Reads all existing data from PostgreSQL `test5` table
- Publishes each row as JSON message to `my_topic`
- Performs **batch processing** (not real-time change detection)

**Usage:**
```bash
node producer.js
```

**Sample Output:**
```
string
db connected
Sent message: {"id":88,"name":"test2","email":"test2@example.com"}
Sent message: {"id":89,"name":"test3","email":"test3@example.com"}
Sent message: {"id":90,"name":"test4","email":"test4@example.com"}
Sent message: {"id":87,"name":"test1","email":"test1@example.com"}
```


## Data Insertion

The `insert.js` script handles:
- Inserting new entries into PostgreSQL tables
- Creating tables if they don't exist
- Managing database schema

**Usage:**
```bash
node insert.js
```

## Kafka Consumer

The `consumer.js` script:
- Connects to the same Kafka broker
- Subscribes to `my_topic` using consumer group `GROUP_ID`
- Processes incoming messages in real-time
- Uses SSL authentication for secure connection

**Usage:**
```bash
node consumer.js
```

**Sample Output:**
```
string
my_topic
db connected
Received message: {"id":88,"name":"test2","email":"test2@example.com"}
Received message: {"id":89,"name":"test3","email":"test3@example.com"}
Received message: {"id":90,"name":"test4","email":"test4@example.com"}
Received message: {"id":87,"name":"test1","email":"test1@example.com"}
```

## Architecture Flow

```
PostgreSQL (test5 table) → producer.js → Kafka (my_topic) → consumer.js
```

**Note:** This implementation performs batch data transfer, not real-time change data capture (CDC).

