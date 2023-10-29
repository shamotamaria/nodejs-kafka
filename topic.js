const {Kafka} = require("kafkajs")

run()

async function run() {
  try{
    const kafka = new Kafka({
      "clientId": "myapp",
      "brokers": ["Marias-MacBook-Pro-2.local:9022"]
    })
    const admin = kafka.admin()
    console.log("Connecting...")
    await admin.connect()
    console.log("Connected")
    await admin.createTopics({
      "topics": [{
        "topic" : "Notifications",
        "numPartitions": 2
      }]
    })
    console.log("Topic created successfully")
    admin.disconnect()
  }
  catch(ex) {
    console.log(`Something bad happened: ${ex}`)
  }
  finally {
    process.exit(0)
  }
}
