/*
* API routes for 'users' collection.
*/
const { Router } = require('express')
const router = Router()

const { insertNewUser, getUserById } = require('../models/user')

router.post('/', async function (req, res) {
    /*
     * Note: not doing validation of request body here.  Don't do that in
     * production.
     */
    try {
        const id = await insertNewUser(req.body)
        res.status(201).send({ _id: id })
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async function (req, res, next) {
    try {
        const user = await getUserById(req.params.id)
        if (user) {
            res.status(200).send(user)
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
})

module.exports = router
