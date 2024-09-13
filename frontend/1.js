const { Kafka } = require('kafkajs');

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
      });
    },
  });
};

// Handle errors
consumer.on('consumer.crash', (error) => {
  console.error('Consumer crashed', error);
});

run().catch(console.error);