const { Kafka } = require("kafkajs")
const msg = process.argv[2]
run()

async function run() {
  try {
    const kafka = new Kafka({
      "clientId": "myapp",
      "brokers": ["Marias-MacBook-Pro-2.local:9022"]
    })
    const producer = kafka.producer()
    console.log("Connecting...")
    await producer.connect()
    console.log("Connected")
    const partition = msg[0] < "N" ? 0 : 1
    const result = await producer.send({
      "topic": "Notifications",
      "messages": [
        {
          "value": msg,
          "partition": partition
        }
      ]
    })
    console.log(`Send successfully: ${JSON.stringify(result)}`)
    producer.disconnect()
  }
  catch (ex) {
    console.log(`Something bad happened: ${ex}`)
  }
  finally {
    process.exit(0)
  }
}
