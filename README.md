# postgres_kafka

This project is built using JavaScript with Node.js as the runtime environment. It integrates PostgreSQL as the database and Apache Kafka for message streaming. The system consists of multiple components that work together to read from the database, publish messages to a Kafka topic, and consume them efficiently.


# Environment/tools

1. Backend language : Javascript <br>

2. Runtime environment :Nodejs <br>

2. Version control : github <br>

# Prerequisites:

Pull the code in local system and create .env to hold db related values

.env file looks like :

DB_HOST=<pg-URL> <br>
DB_PORT=21421 <br>
DB_USER=<USER_NAME> <br>
DB_PASSWORD=<PASSWORD> <br>
DB_NAME=<DB_NAME> <br>

# Components

    1. db.js - Establishes a connection to the PostgreSQL database using the pg module. <br>

    2. inser.js - Inserts data into the PostgreSQL database. <br>

    3. producer.js - Reads data from the database and publishes it to a Kafka topic.<br>

    4. <consumer.js> -  Listens to the Kafka topic and processes incoming messages.

# Database Setup and Testing

 I used the psql command-line interface (CLI)

 psql -h <psql_endpoint> 

 To verify:

 1. list all Db <br>
    \l
2. list all tables <br>
    \dt<br>
    pgtestDb=> \dt <br>

    pgtestDb=> \dt
         List of relations
 Schema | Name  | Type  |  Owner   
--------+-------+-------+----------
 public | test5 | table | avnadmin
(1 row)

pgtestDb=>  SELECT * FROM test5;<br>
 id | name  |       email       <br>
 88 | test2 | test2@example.com<br>
 89 | test3 | test3@example.com<br>
 90 | test4 | test4@example.com<br>
 87 | test1 | test1@example.com<br>
(4 rows)


## Below are answers to questions 


# Q2 Connection to PostgreSQL service:
The <db.js> script in /main makes the connection to ps using the pg library. The dotenv manages the environment variables defined in .env file to not hardcode senititve information. 

.env is in the gitignore file, so you won't see it in the repository. I make use of a separate database named pgtestDb instead of the defaultdb

How to run :

node db.js or nodemon db

# Q3 Connection to Kafka and extracting changes in PostgreSQL


The project connects to Kafka using the node-rdkafka library.

Producer Connection:

    <producer.js> Connects to the Kafka broker using SSL authentication.

    Producer connects to PostgreSQL by importing the db connection and reusing it, reads data from a table <table5>, and then sends that data to a Kafka topic

    Sends messages to a specified topic- <my_topic>

    ## Output from the script 

    $node producer.js <br>
    string<br>
    db connected<br>
    Sent message: {"id":88,"name":"test2","email":"test2@example.com"}<br>
    Sent message: {"id":89,"name":"test3","email":"test3@example.com"}<br>
    Sent message: {"id":90,"name":"test4","email":"test4@example.com"}<br>
    Sent message: {"id":87,"name":"test1","email":"test1@example.com"}<br>


# Q4 Inserting into table

The <insert.js> script inserts entries to tables

# Read from Kafka

The <consumer.js> script connects to the same broker and subscribes to the topic <my_topic>

## Output from the sript 

$node consumer.js
string
my_topic
db connected
Received message: {"id":88,"name":"test2","email":"test2@example.com"}<br>
Received message: {"id":89,"name":"test3","email":"test3@example.com"}<br>
Received message: {"id":90,"name":"test4","email":"test4@example.com"}<br>
Received message: {"id":87,"name":"test1","email":"test1@example.com"}<br>


Listens for messages and processes them in real-time.

