const Kafka = require("node-rdkafka");
const { Client } = require('pg');
const con = require("./db")

const TOPIC_NAME = "my_topic";

console.log(typeof(TOPIC_NAME))
const producer = new Kafka.Producer({
  'metadata.broker.list': "kafka-29fbd26d-kafka1-postgr.b.aivencloud.com:21423",
  "security.protocol": "ssl",
  "ssl.key.location": "serviceK.key",
  "ssl.certificate.location": "service.cert",
  "ssl.ca.location": process.env.KAFKA_CA,
  dr_cb: true,
});
  const fetchDataFromTable = async () => {
    try {
      await client.connect();
      const res = await client.query('SELECT * FROM test5');  
      return res.rows;  // Return the rows
    } catch (err) {
      console.error('Error fetching data from PostgreSQL:', err);
    } finally {
      await client.end();
    }
  };
  
  // Send data to Kafka
  const sendToKafka = async () => {
    const rows = await fetchDataFromTable();
    rows.forEach((row) => {
      const message = JSON.stringify(row);  
      producer.produce(
        "my_topic",
        null,  // Use default partitioning
        Buffer.from(message),
        null, 
        Date.now()  
      );
      console.log('Sent message:', message);
    });
  
    // producer.disconnect();  // Disconnect after producing messages
  };
  
  // Connect to Kafka and send messages
  producer.connect({}, () => {
    sendToKafka();
  });
