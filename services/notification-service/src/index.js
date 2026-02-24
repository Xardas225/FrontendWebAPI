const { Kafka } = require("kafkajs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKERS || "localhost:9092"],
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
});

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Home Chef" <${process.env.SMTP_FROM || "noreply@homechef.local"}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

async function run() {
  const consumer = kafka.consumer({ groupId: "notification-group" });

  await consumer.connect();

  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC || "order-created",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log("Received event:", event);

      const { UserName, OrderId, TotalSum } = event;

      const emailHtml = `
        <h2>Ваш заказ #${OrderId} создан</h2>
        <p>Сумма заказа: ${TotalSum} руб.</p>
        <p>Спасибо, что выбрали Home Chef!</p>
      `;

      await sendEmail(`${UserName}@yandex.ru`, `Заказ #${OrderId} создан`, emailHtml);
    },
  });
}

run().catch(console.error);