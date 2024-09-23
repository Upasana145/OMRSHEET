const { Kafka } = require('kafkajs');
require('dotenv').config(); // Load environment variables

// Initialize Kafka client
const kafka = new Kafka({
  brokers: ['157.173.222.15:9092'], // Kafka broker address
});

// Create a consumer instance
const consumer = kafka.consumer({ groupId: 'test-group' });

// Function to listen to Kafka messages
const run = async () => {
  // Connect to the Kafka consumer
  await consumer.connect();

  // Subscribe to the Kafka topic
  await consumer.subscribe({ topic: 'testtopic', fromBeginning: true });

  // Consume messages from the topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
        key: message.key.toString(),
      });
      const payload = {
        value: message.value.toString(),
        key: message.key.toString(),
      };

      const action = await fetch(`${process.env.REACT_APP_API_URI}/kafka/results`, {
      // const action = await fetch(`http://localhost:4002/api/v1/kafka/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log('API URI:', process.env.REACT_APP_API_URI); 
      
      if (!action.ok) {
        console.error('Failed to send data:', action.statusText);
      } else {
        console.log('Data sent successfully');
      }
      
    },
  });
};

  // Handle errors
  consumer.on('consumer.crash', (error) => {
    console.error('Consumer crashed', error);
  });

run().catch(console.error);