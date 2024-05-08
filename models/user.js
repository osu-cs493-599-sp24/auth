/*
 * User schema and data accessor methods.
 */

const { ObjectId } = require('mongodb')

const bcrypt = require('bcryptjs')

const { getDb } = require('../lib/mongodb')

/*
 * Insert a new User into the DB.
 */
exports.insertNewUser = async function (user) {
    const db = getDb()
    const collection = db.collection('users')

    const hash = await bcrypt.hash(user.password, 8)
    console.log("== hash:", hash)

    const result = await collection.insertOne({
        ...user,
        password: hash
    })
    return result.insertedId
}

/*
 * Fetch a user from the DB based on user ID.
 */
async function getUserById (id, includePassword) {
    const db = getDb()
    const collection = db.collection('users')
    if (!ObjectId.isValid(id)) {
        return null
    } else {
        const results = await collection
            .find({ _id: new ObjectId(id) })
            .project(includePassword ? {} : { password: 0 })
            .toArray()
        return results[0]
    }
}
exports.getUserById = getUserById

exports.validateCredentials = async function (id, password) {
    const user = await getUserById(id, true)
    return user && await bcrypt.compare(password, user.password)
}
