const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'db_alvin_betest';

let database = null

async function connect() {
    await client.connect();
    
    const db = client.db(dbName);
    const userCollection = db.collection('users');

    database = db
  
    const users = await userCollection.find().toArray()
}

function getDatabase(){
    return database
}

module.exports = {connect, getDatabase}