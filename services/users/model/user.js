const { getDatabase } = require('../config/mongodb')

class User {
    static async findAll(){
        const db = getDatabase()
        const userCollection = db.collection('users')
        const users = await userCollection.find().toArray()

        return users
    }

    static async create(user){
        const db = getDatabase()
        const userCollection = db.collection('users')
        const users = await userCollection.insertOne(user)

        return user
    }

}

module.exports = User