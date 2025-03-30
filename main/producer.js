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
  "ssl.ca.location": "caK.pem",
  dr_cb: true,
});

// PostgreSQL connection setup
// const client = new Client({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     ssl: {
//         rejectUnauthorized: false, 
//       },
//     });
  // Query data from `test5` table
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
      const message = JSON.stringify(row);  // Convert row to string (JSON format)
      producer.produce(
        "my_topic",
        null,  // Use default partitioning
        Buffer.from(message),
        null,  // Optional key (could be null)
        Date.now()  // Optional timestamp
      );
      console.log('Sent message:', message);
    });
  
    // producer.disconnect();  // Disconnect after producing messages
  };
  
  // Connect to Kafka and send messages
  producer.connect({}, () => {
    sendToKafka();
  });

// producer.connect();

// const sleep = async (timeInMs) =>
//   await new Promise((resolve) => setTimeout(resolve, timeInMs));

// const produceMessagesOnSecondIntervals = async () => {
//   // produce 100 messages on 1 second intervals
//   let i = 0;
//   while (i < 100) {
//     try {
//       if (!producer.isConnected()) {
//         await sleep(1000);
//         continue;
//       }

//       const message = `Hello from Node using SSL ${++i}!`;
//       producer.produce(
//         // Topic to send the message to
//         TOPIC_NAME,
//         // optionally we can manually specify a partition for the message
//         // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
//         null,
//         // Message to send. Must be a buffer
//         Buffer.from(message),
//         // for keyed messages, we also specify the key - note that this field is optional
//         null,
//         // you can send a timestamp here. If your broker version supports it,
//         // it will get added. Otherwise, we default to 0
//         Date.now()
//       );
//       console.log(`Message sent: ${message}`);
//     } catch (err) {
//       console.error("A problem occurred when sending our message");
//       console.error(err);
//     }

//     await sleep(1000);
//   }

//   producer.disconnect();
// };

// produceMessagesOnSecondIntervals();