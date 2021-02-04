const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = MongoClient(url, {
  useUnifiedTopology: true
});

class DataBase {
  constructor() {
    run().catch(console.error);
  }
}

async function run() {
  try {
    await client.connect();
    await client.db("mirage").command({ ping: 1 });
    console.log('[Mongo] Connected Successfully');
  } catch(e) {
    console.log('[Mongo] Error Connecting To Database');
  } finally {
    if (!global.mirage) {
      global.mirage = {
        db: {}
      }
    }
    global.mirage.db = client.db("mirage");
  }
}

module.exports = DataBase;