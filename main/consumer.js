const Kafka = require("node-rdkafka");
const con = require("./db")

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

// Event when the consumer is connected
// stream.on("ready", () => {
//   console.log('✅ Consumer is ready! Subscribing to topic:');
  

  

//   stream.subscribe(TOPIC_NAME); // Subscribe to the topic
//   console.log('subscribed');
  

//   // Start consuming messages
//   try {
//     stream.consume(1);
//     console.log('consumed');
//   }catch (error){
// console.error("Got errr:", error);
//   }})


// // Event when a message is received
// stream.on("data", (message) => {
//   console.log(typeof(message));
//   // console.log(`📩 Received message: ${message.value.toString()}`);
// });

// // Handle Kafka errors
// stream.on("error", (err) => {
//   console.error("❌ Kafka Error:", err);
// });

// // Connect the consumer
//  stream.connect();
// //   consumer.consume(); // Start consuming messages
// });
// consumer.on("data", (message) => {
//   console.log(`📩 Received message: ${message.value.toString()}`);
// });

// Handle errors


// Connect the consumer
//consumer.connect();
// try {
//   consumer.connect()
//   consumer.subscribe([TOPIC_NAME])
//   consumer.consume()
// }catch (error){
//   console.error("Got errr:", error);
// }

//const stream = new Kafka.createReadStream(TOPIC_NAME)
// console.log(stream.TOPIC_NAME)
// stream.on('ready',() => {
//   console.log('consumer ready')
// }
// consumer.on("data", (message) => {
//   try {
//     console.log("Got message using SSL:", message.value.toString());


//   } catch (error){
//     console.error("Got errr:", error);
//   }
// });
// consumer.on("error", (err) => {
//   console.error("Got errr:", err);
// });