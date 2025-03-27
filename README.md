# postgres_kafka
This project demonstrates how to integrate Kafka with a PostgreSQL database, using Producer and Consumer components. The Producer sends data to a Kafka topic, while the Consumer listens for incoming messages from the Kafka topic . It also creates a table in the database and adds entry to it.

Answers :

Prerequisites:

Pull the code in local system and create .env to hold db related values

.env file looks like :

DB_HOST=<pg-URL>
DB_PORT=21421
DB_USER=<USER_NAME>
DB_PASSWORD=<PASSWORD>
DB_NAME=<DB_NAME>

2. Connection to PostgreSQL service:
the db.js script in /main makes the connection to ps using the pg library. The dotenv manages the environment variables defined in .env file to not hardcode senititve information. 
.env is in the gitignore file, so you won't see it in the repository. I make use of a separate database named pgtestDb instead of the defaultdb

How to run :

node db.js or nodemon db

3. Connect to Kafka
    Connection to Kafka is made using the node-rdkafka library and Nodejs runtime environment.It allows producing and consuming messages.