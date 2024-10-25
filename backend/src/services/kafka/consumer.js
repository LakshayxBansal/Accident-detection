// kafka/consumer.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'accident-alert-system',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'alert-group' });

export const startAccidentConsumer = async () => {
  await consumer.connect();
  
  await consumer.subscribe({ topic: 'accident-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const accidentEvent = JSON.parse(message.value.toString());
      console.log(`Received accident event: ${accidentEvent}`);

      // Here you can send an SMS, email, or any other alert
    },
  });
};
