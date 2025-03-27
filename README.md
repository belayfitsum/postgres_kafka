# postgres_kafka
This project demonstrates how to integrate Kafka with a PostgreSQL database, using Producer and Consumer components. The Producer sends data to a Kafka topic, while the Consumer listens for incoming messages from the Kafka topic . It also creates a table in the database and adds entry to it.

Answers :

# Prerequisites:

Pull the code in local system and create .env to hold db related values

.env file looks like :

DB_HOST=<pg-URL>
DB_PORT=21421
DB_USER=<USER_NAME>
DB_PASSWORD=<PASSWORD>
DB_NAME=<DB_NAME>

# Connection to PostgreSQL service:
The <db.js> script in /main makes the connection to ps using the pg library. The dotenv manages the environment variables defined in .env file to not hardcode senititve information. 

.env is in the gitignore file, so you won't see it in the repository. I make use of a separate database named pgtestDb instead of the defaultdb

How to run :

node db.js or nodemon db

# Connection to Kafka and extracting changes in PostgreSQL


The project connects to Kafka using the node-rdkafka library.

Producer Connection:

    <producer.js> Connects to the Kafka broker using SSL authentication.

    Producer connects to PostgreSQL by importing the db connection and reusing it, reads data from a table <table5>, and then sends that data to a Kafka topic

    Sends messages to a specified topic- <my_topic>

# Inserting into table

The <insert.js> file in /main inserts entries to tables

# Read from Kafka

The <consumer.js> file in /main connects to the same broker and subscribes to the topic <my_topic>

Listens for messages and processes them in real-time.

