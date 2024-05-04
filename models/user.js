/*
 * User schema and data accessor methods.
 */

const { ObjectId } = require('mongodb')

const { getDb } = require('../lib/mongo')

/*
 * Insert a new User into the DB.
 */
exports.insertNewUser = async function (user) {
    const db = getDb()
    const collection = db.collection('users')
    const result = await collection.insertOne(user)
    return result.insertedId
}

/*
 * Fetch a user from the DB based on user ID.
 */
exports.getUserById = async function (id) {
    const db = getDb()
    const collection = db.collection('users')
    if (!ObjectId.isValid(id)) {
        return null
    } else {
        const results = await collection
            .find({ _id: new ObjectId(id) })
            .toArray()
        return results[0]
    }
}
