const Kafka = require("node-rdkafka");
// const con = require("./db") // no need for db connection, producer is connected and sending messages to topics

const TOPIC_NAME = "my_topic";
console.log(typeof(TOPIC_NAME))
console.log(TOPIC_NAME);

const stream = new Kafka.createReadStream(

  {
    "metadata.broker.list": "kafka-29fbd26d-kafka1-postgr.b.aivencloud.com:21423",
    "group.id": "GROUP_ID", 
    "security.protocol": "ssl",
    "ssl.key.location": "serviceK.key",
    "ssl.certificate.location": "service.cert",
    "ssl.ca.location": "caK.pem", 
    "debug": "security,broker,protocol",
  },
  { "auto.offset.reset": "latest" },
  { topics: [TOPIC_NAME] }
);

// Event when a message is received
stream.on("data", (message) => {
  console.log(`📩 Received message: ${message.value.toString()}`);
});

// Handle Kafka errors
stream.on("error", (err) => {
  console.error("❌ Kafka Error:", err);
});
