const { Kafka } = require("kafkajs")

run()

async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "myapp",
      "brokers": ["Marias-MacBook-Pro-2.local:9022"]
    })
    const consumer = kafka.consumer({
      "groupId": "test"
    })
    console.log("Connecting...")
    await consumer.connect()
    console.log("Connected")
    await consumer.subscribe({
      "topic": "Notifications",
      "fromBeginning": true
    })

    await consumer.run({
      "eachMessage": async result => {
        console.log(`Received a message ${result.message.value} on partition ${result.partition}`)
      }
    })
  }
  catch (ex) {
    console.log(`Something bad happened: ${ex}`)
  }
}
