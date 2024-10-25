// kafka/producer.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'accident-alert-system',
  brokers: ['localhost:9092'], // Make sure your broker address is correct
});

const producer = kafka.producer();

export const sendAccidentEvent = async (message) => {
  await producer.connect();
  
  await producer.send({
    topic: 'accident-events', // Topic to which messages are published
    messages: [
      { value: JSON.stringify(message) }, // Accident data
    ],
  });

  await producer.disconnect();
};
